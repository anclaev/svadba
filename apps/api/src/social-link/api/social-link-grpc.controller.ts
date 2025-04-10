import { Controller } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'
import { GrpcMethod } from '@nestjs/microservices'
import { base, social_link } from '@repo/shared'
import { from, map, Observable } from 'rxjs'

import { GetSocialLinksQuery } from '#/social-link/app/queries/get-social-links'
import { SocialLinkMapper } from '#/social-link/infra'

const mockedGetSocialLinksResult = {
  items: [
    {
      id: '1',
      alias: 'test',
      title: 'test',
      creator: {
        id: '1',
        username: 'test',
        email: 'test@gmail.com',
        avatar: 'test',
        created_at: '2022-08-22T06:53:58.998Z',
        updated_at: '2022-08-22T06:53:58.998Z',
        guest_role: '1',
        role: '1',
        guest_side: '1',
        guest_status: '1',
        name: 'test',
        login: 'test',
        is_telegram_verified: false,
      },
      created_at: '2022-08-22T06:53:58.998Z',
      href: 'test',
      icon: 'test',
      creator_id: '1',
    },
  ],
}

@Controller()
export class SocialLinkGrpcController
  implements social_link.SocialLinkServiceController
{
  constructor(private readonly queryBus: QueryBus) {}

  @GrpcMethod('SocialLinkService', 'GetSocialLinks')
  GetSocialLinks({
    size,
    page,
  }: base.PaginationRequest): Observable<social_link.SocialLinks> {
    const socialLinks = this.queryBus.execute(
      new GetSocialLinksQuery({ size, page })
    )

    return from(socialLinks).pipe(
      map((res) => ({
        items: res.data.map((link) => SocialLinkMapper.toProto(link)),
      }))
    )

    // return Promise.resolve(mockedGetSocialLinksResult)
  }
}
