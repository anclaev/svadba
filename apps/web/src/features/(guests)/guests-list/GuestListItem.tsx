'use client'

import { FC } from 'react'

import { Badge } from '@/shared/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'

import { UserModel } from '@/core/models'
import { parseGuestRole, parseUserStatus } from '@/core/utils/parsers'

export type GuestListItemProps = {
  item: UserModel
  //   handleUpdated: (user: UserModel) => void
}

export const GuestListItem: FC<GuestListItemProps> = ({ item }) => {
  return (
    <Card className="hover:scale-102 transition-all">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div className="space-x-2">
            <span>{item.name}</span>
            <Badge variant="outline">{parseGuestRole(item.guest.role)}</Badge>
          </div>
        </CardTitle>
        <CardDescription className="space-x-2">
          <span>{item.login} </span>
          <Badge>{parseUserStatus(item.status)}</Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
