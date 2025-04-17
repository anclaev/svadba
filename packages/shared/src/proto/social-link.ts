import { Observable } from 'rxjs'

import { base } from './base'
import { user } from './user'

export namespace social_link {
  export const PACKAGE_NAME = 'social_link'

  export interface SocialLink {
    id: string
    alias: string
    title: string
    href: string
    creator?: user.User
    creator_id: string
    created_at: string
    icon?: string
  }

  export interface SocialLinks {
    items: SocialLink[]
  }

  export interface SocialLinkServiceClient {
    GetSocialLinks(data: base.PaginationRequest): Observable<SocialLinks>
  }

  export interface SocialLinkServiceController {
    GetSocialLinks(
      request: base.PaginationRequest
    ): Promise<SocialLinks> | Observable<SocialLinks> | SocialLinks
  }
}
