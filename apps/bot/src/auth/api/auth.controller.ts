import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common"
import { randomUUID } from "crypto"
import { Request, Response } from "express"

import { ConfigService } from "#/config/config.service"

import { User } from "#/users/domain/user"

import { AuthService } from "../application/auth.service"
import { AuthenticatedUser } from "../application/decorators/user.decorator"
import { LocalAuthGuard } from "../application/guards/local-auth.guard"
import { RefreshGuard } from "../application/guards/refresh.guard"
import { Auth } from "../application/decorators/auth.decorator"

import {
  AuthCookieData,
  Cookies,
  RefreshCookieData,
  Tokens,
} from "../infra/types"

@Controller("auth")
export class AuthController {
  private NODE_ENV

  constructor(
    private auth: AuthService,
    private config: ConfigService,
  ) {
    this.NODE_ENV = this.config.env("NODE_ENV")
  }

  @Auth()
  @Get()
  getAuthenticatedUser(@AuthenticatedUser() authenticatedUser: User): User {
    return authenticatedUser
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(200)
  async login(
    @AuthenticatedUser() authenticatedUser: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, access_token, refresh_token, refresh_token_id } =
      await this.auth.login(authenticatedUser)

    this.setCookies(access_token, refresh_token, refresh_token_id, res)

    return user
  }

  @Get("refresh")
  @UseGuards(RefreshGuard)
  async refreshToken(
    @AuthenticatedUser() authenticatedUser: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refresh_token_id = randomUUID()

    const access_token = await this.auth.generateToken(
      authenticatedUser,
      Tokens.ACCESS,
    )

    const refresh_token = await this.auth.generateToken(
      authenticatedUser,
      Tokens.REFRESH,
      refresh_token_id,
    )

    this.setCookies(access_token, refresh_token, refresh_token_id, res)

    return { message: "ok" }
  }

  @Auth()
  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req: Request, @Res() res: Response) {
    const { refresh_token_id }: AuthCookieData =
      req.signedCookies["auth-cookie"]

    const user = req.user! as User
    const userId = user.getId() as number

    await this.auth.removeRefreshToken(userId, refresh_token_id)

    res.cookie(
      Cookies.AUTH_COOKIE,
      {},
      {
        httpOnly: true,
        signed: true,
        secure: true,
        path: "/",
        domain: this.config.env("HOST"),
        maxAge: 1,
      },
    )

    res.cookie(
      Cookies.REFRESH_COOKIE,
      {},
      {
        httpOnly: true,
        signed: true,
        secure: true,
        path: "/auth/refresh",
        domain: this.config.env("HOST"),
        maxAge: 1,
      },
    )

    res.send("ok")
  }

  private setCookies(
    access_token: string,
    refresh_token: string,
    refresh_token_id: string,
    res: Response,
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
      path: "/",
      domain: this.config.env("HOST"),
      maxAge: this.config.env("JWT_ACCESS_TIME") * 1000,
    })

    res.cookie(Cookies.REFRESH_COOKIE, refreshCookieData, {
      httpOnly: true,
      signed: true,
      secure: true,
      path: "/auth/refresh",
      domain: this.config.env("HOST"),
      maxAge: this.config.env("JWT_REFRESH_TIME") * 1000,
    })
  }
}
