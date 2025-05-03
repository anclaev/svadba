'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '@/shared/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination'

import { usePagination } from '@/core/hooks'
import { UserModel } from '@/core/models'
import { getGuestsQuery } from '@/core/queries/(guests)'

import { GuestListItem } from './GuestListItem'
import { GuestListItemSkeleton } from './GuestListItemSkeleton'

export const GuestsList = () => {
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
    getGuestsQuery({
      page: currentPage,
      size: pageSize,
    })
  )

  const [guests, setGuests] = useState<UserModel[]>([])

  const paginationItems = useMemo(() => {
    const items = []

    for (let i = 1; i <= pagesCount; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }, [pagesCount, currentPage, setCurrentPage])

  useEffect(() => {
    if (res && res.data) {
      setGuests(res.data)
      setTotalItems(res.meta!.total)
      setPagesCount(res.meta!.lastPage)
    }
  }, [res, setPagesCount])

  return (
    <section>
      <div className="flex justify-between items-center space-x-3">
        <h2 className="py-3 font-medium text-lg">
          Гости <Badge variant="default">{totalItems}</Badge>
        </h2>
        {/* <CreatePopover variant="default" title={<SquarePen />}>
          <CreateSocialLinkForm handleCreated={handleCreateLink} />
        </CreatePopover> */}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {isPending ? (
          <>
            <GuestListItemSkeleton />
            <GuestListItemSkeleton />
            <GuestListItemSkeleton />
            <GuestListItemSkeleton />
            <GuestListItemSkeleton />
            <GuestListItemSkeleton />
          </>
        ) : (
          guests.map((item, key) => (
            <>
              <GuestListItem item={item} key={key * 1} />
              <GuestListItem item={item} key={key * 2} />
              <GuestListItem item={item} key={key * 3} />
              <GuestListItem item={item} key={key * 4} />
              <GuestListItem item={item} key={key * 5} />
              <GuestListItem item={item} key={key * 6} />
            </>
          ))
        )}
      </div>
      <Pagination className="pt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              title=""
              onClick={handlePreviousPage}
            />
          </PaginationItem>
          {paginationItems}
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
