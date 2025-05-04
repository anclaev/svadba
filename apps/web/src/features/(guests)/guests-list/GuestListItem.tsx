'use client'

import { FC } from 'react'

import { Badge } from '@/shared/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

import { GuestModel } from '@/core/models'
import { parseGuestRole, parseUserStatus } from '@/core/utils/parsers'

export type GuestListItemProps = {
  item: GuestModel
  //   handleUpdated: (user: UserModel) => void
}

export const GuestListItem: FC<GuestListItemProps> = ({ item }) => {
  return (
    <Card className="hover:scale-102 transition-all">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="space-x-2">
            <span>{item.user.name}</span>
            <Badge variant="outline">{parseGuestRole(item.role)}</Badge>
          </div>
        </CardTitle>
        <CardDescription className="space-x-2">
          <span>{item.user.login} </span>
          <Badge>{parseUserStatus(item.user.status)}</Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
