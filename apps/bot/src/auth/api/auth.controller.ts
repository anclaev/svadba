import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ThrottlerGuard } from '@nestjs/throttler'
import { randomUUID } from 'crypto'
import { Request, Response } from 'express'

import { ConfigService } from '#/config/config.service'

import { User } from '#/user/domain'

import { AuthService } from '../application/auth.service'
import { Auth } from '../application/decorators/auth.decorator'
import { AuthenticatedUser } from '../application/decorators/user.decorator'
import { LocalAuthGuard } from '../application/guards/local-auth.guard'
import { RefreshGuard } from '../application/guards/refresh.guard'

import { AuthParamsDto } from './dtos/auth-params.dto'
import { LoginDto } from './dtos/login.dto'
import { LogoutParamsDto } from './dtos/logout-params.dto'
import { SignUpDto } from './dtos/sign-up.dto'

import { USER_ERRORS, UserError } from '#/user/infra'
import {
  AuthCookieData,
  Authorized,
  Cookies,
  RefreshCookieData,
  Tokens,
} from '../infra/types'

@ApiTags('Авторизация')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  private NODE_ENV

  constructor(
    private auth: AuthService,
    private config: ConfigService
  ) {
    this.NODE_ENV = this.config.env('NODE_ENV')
  }

  @ApiOperation({ summary: 'Получение данных о себе' })
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiOkResponse({ description: 'Данные о пользователе', type: User })
  @Auth()
  @Get('profile')
  getAuthenticatedUser(@AuthenticatedUser() authenticatedUser: User): User {
    return authenticatedUser
  }

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ description: 'Данные для регистрации', type: SignUpDto })
  @ApiQuery({
    name: 'grant_type',
    description: 'Тип получаемых токенов',
    type: AuthParamsDto,
  })
  @ApiOkResponse({
    description: 'Данные о пользователе с токенами доступа',
    type: User,
  })
  @ApiConflictResponse({
    description: 'Гость с данным логином уже зарегистрирован.',
  })
  @Post('sign-up')
  @HttpCode(200)
  async signUp(
    @Body() dto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
    @Query() authParams: AuthParamsDto
  ): Promise<Authorized> {
    const result = await this.auth.signUp(dto)

    if (result instanceof UserError) {
      switch (result.message) {
        case USER_ERRORS.USER_ALREADY_EXISTS: {
          throw new ConflictException(
            'Пользователь с данным логином уже зарегистрирован..'
          )
        }
        default: {
          throw new BadRequestException(res)
        }
      }
    }

    const { user, access_token, refresh_token, refresh_token_id } = result

    switch (authParams.grant_type) {
      case 'token': {
        return { user, access_token, refresh_token, refresh_token_id }
      }
      default: {
        this.setCookies(access_token, refresh_token, refresh_token_id, res)
        return { user }
      }
    }
  }

  @ApiOperation({ summary: 'Авторизация пользователя через пароль' })
  @ApiBody({ description: 'Данные для авторизации', type: LoginDto })
  @ApiQuery({
    name: 'grant_type',
    description: 'Тип получаемых токенов',
    type: AuthParamsDto,
  })
  @ApiUnauthorizedResponse({ description: 'Неверные учетные данные' })
  @ApiOkResponse({
    description: 'Данные о пользователе с токенами доступа',
    type: User,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @AuthenticatedUser() authenticatedUser: User,
    @Res({ passthrough: true }) res: Response,
    @Query() authParams: AuthParamsDto
  ): Promise<Authorized> {
    const { user, access_token, refresh_token, refresh_token_id } =
      await this.auth.login(authenticatedUser)

    switch (authParams.grant_type) {
      case 'token': {
        return { user, access_token, refresh_token, refresh_token_id }
      }
      default: {
        this.setCookies(access_token, refresh_token, refresh_token_id, res)
        return { user }
      }
    }
  }

  @ApiOperation({ summary: 'Обновление токена доступа' })
  @ApiQuery({
    name: 'grant_type',
    description: 'Тип получаемых токенов',
    type: AuthParamsDto,
  })
  @ApiOkResponse({
    description: 'Данные о пользователе с токенами доступа',
    example: 'ok',
  })
  @ApiUnauthorizedResponse({
    description: 'Ошибка обновления токена',
  })
  @ApiCookieAuth()
  @Get('refresh')
  @UseGuards(RefreshGuard)
  async refreshToken(
    @AuthenticatedUser() authenticatedUser: User,
    @Res({ passthrough: true }) res: Response,
    @Query() authParams: AuthParamsDto
  ): Promise<Authorized> {
    const refresh_token_id = randomUUID()

    const access_token = await this.auth.generateToken(
      authenticatedUser,
      Tokens.ACCESS
    )

    const refresh_token = await this.auth.generateToken(
      authenticatedUser,
      Tokens.REFRESH,
      refresh_token_id
    )

    switch (authParams.grant_type) {
      case 'token': {
        return {
          user: authenticatedUser,
          access_token,
          refresh_token,
          refresh_token_id,
        }
      }
      default: {
        this.setCookies(access_token, refresh_token, refresh_token_id, res)
        return { user: authenticatedUser }
      }
    }
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiQuery({
    name: 'rtid',
    description: 'Идентификатор refresh-токена.',
    type: LogoutParamsDto,
  })
  @ApiOkResponse({ description: 'Выход пользователя выполнен' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiCookieAuth()
  @Auth()
  @Post('logout')
  @HttpCode(200)
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Query() logoutParams: LogoutParamsDto
  ) {
    let rtid: string

    if (logoutParams.rtid) {
      rtid = logoutParams.rtid
    } else {
      const authCookie: AuthCookieData = req.signedCookies['auth-cookie']

      if (!authCookie) {
        return
      }

      rtid = authCookie.refresh_token_id
    }

    const user = req.user! as User
    const userId = user.id!
    await this.auth.removeRefreshToken(userId, rtid)

    res.cookie(
      Cookies.AUTH_COOKIE,
      {},
      {
        httpOnly: true,
        signed: true,
        secure: true,
        path: '/',
        domain: this.config.env('HOST'),
        maxAge: 1,
      }
    )

    res.cookie(
      Cookies.REFRESH_COOKIE,
      {},
      {
        httpOnly: true,
        signed: true,
        secure: true,
        path: '/auth/refresh',
        domain: this.config.env('HOST'),
        maxAge: 1,
      }
    )

    res.send('ok')
  }

  private setCookies(
    access_token: string,
    refresh_token: string,
    refresh_token_id: string,
    res: Response
  ): void {
    const authCookieData: AuthCookieData = {
      access_token,
      refresh_token,
      refresh_token_id,
    }

    const refreshCookieData: RefreshCookieData = {
      refresh_token,
      refresh_token_id,
    }

    res.cookie(Cookies.AUTH_COOKIE, authCookieData, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: '/',
      domain: this.config.env('HOST'),
      maxAge: this.config.env('JWT_ACCESS_TIME') * 1000,
    })

    res.cookie(Cookies.REFRESH_COOKIE, refreshCookieData, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: '/api/auth/refresh',
      domain: this.config.env('HOST'),
      maxAge: this.config.env('JWT_REFRESH_TIME') * 1000,
    })
  }
}
