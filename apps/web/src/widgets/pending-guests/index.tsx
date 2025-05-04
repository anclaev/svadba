'use client'

import { usePagination } from '@/core/hooks'
import { Badge } from '@/shared/ui/badge'
import { useQuery } from '@tanstack/react-query'

import { FC, useEffect, useState } from 'react'

import { GuestModel } from '@/core/models'
import { getPendingGuestsQuery } from '@/core/queries/(guests)'
import { dayjs } from '@/core/utils/dayjs'
import { parseGuestRole, parseGuestSide } from '@/core/utils/parsers'

// TODO: Доработать виджет новых гостей

export const PendingGuests: FC = () => {
  const {
    currentPage,
    pageSize,
    pagesCount,
    setCurrentPage,
    setPagesCount,
    handleNextPage,
    handlePreviousPage,
  } = usePagination({
    page: 1,
    size: 6,
    count: 1,
  })

  const [totalItems, setTotalItems] = useState<number>(1)

  const { data: res, isPending } = useQuery(
    getPendingGuestsQuery({
      page: currentPage,
      size: pageSize,
    })
  )

  const [guests, setGuests] = useState<GuestModel[]>([])

  useEffect(() => {
    console.log(res)
    if (res && res.data) {
      setGuests(res.data)
      setTotalItems(res.meta!.total)
      setPagesCount(res.meta!.lastPage)
    }
  }, [res, setPagesCount])

  return (
    <div className="flex flex-col px-5 py-5 bg-[var(--card)] space-y-2 rounded-md shadow-md">
      <h2 className="font-trajan text-md">Новые гости</h2>
      <div className="flex flex-col space-y-2">
        {guests.map((guest, key) => (
          <div
            key={key}
            className="space-x-1 flex items-center hover:bg-amber-50 cursor-pointer transition-all rounded-md select-none"
          >
            <Badge>{parseGuestRole(guest.role)}</Badge>
            <Badge variant="outline">{parseGuestSide(guest.side)}</Badge>
            <span className="text-sm grow truncate ...">{guest.user.name}</span>
            <span className="text-sm">
              {dayjs(guest.createdAt).locale('ru').format('D MMMM, YYYY')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
