import { Controller, InternalServerErrorException } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GrpcMethod } from '@nestjs/microservices'
import { base, social_link } from '@repo/shared'
import { from, map, Observable, of, switchMap } from 'rxjs'

import { SocialLinksQuery } from '#/social-link/app'
import { SocialLinkError } from '#/social-link/domain'
import { SocialLinkPrismaMapper } from '#/social-link/infra'

@Controller()
export class SocialLinkGRPCController
  implements social_link.SocialLinkServiceController
{
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod('SocialLinkService', 'GetSocialLinks')
  GetSocialLinks({
    size,
    page,
  }: base.PaginationRequest): Observable<social_link.SocialLinks> {
    const socialLinks = this.queryBus.execute(
      new SocialLinksQuery({ size, page })
    )

    return from(socialLinks).pipe(
      switchMap((res) => {
        if (res instanceof SocialLinkError) {
          throw new InternalServerErrorException('Что-то пошло не так.')
        }

        return of(res)
      }),
      map((res) => {
        return {
          items: res.data.map((link) => SocialLinkPrismaMapper.toProto(link)),
        }
      })
    )
  }
}
