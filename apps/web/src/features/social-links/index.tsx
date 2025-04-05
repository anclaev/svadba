'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Badge } from '@/shared/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

import { SocialLinkSkeleton } from './SocialLinkSkeleton'

import { usePagination } from '@/core/hooks/use-pagination'
import { SocialLinkItemModel } from '@/core/models/social-link.model'
import { fetchSocialLinksQuery } from '@/core/queries/fetchSocialLinks.query'

export const SocialLinks = () => {
  const {
    currentPage,
    pageSize,
    paginationItems,
    setPagesCount,
    handleNextPage,
    handlePreviousPage,
  } = usePagination()

  const [totalItems, setTotalItems] = useState<number>(1)

  const { data, isPending } = useQuery(
    fetchSocialLinksQuery({
      page: currentPage,
      size: pageSize,
    })
  )

  const [links, setLinks] = useState<SocialLinkItemModel[]>([])

  useEffect(() => {
    if (data && data.data) {
      setLinks(data.data)
      setTotalItems(data.meta!.total)
      setPagesCount(data.meta!.lastPage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <section>
      <h2 className="py-3 font-medium text-lg">
        Социальные ссылки <Badge variant="default">{totalItems}</Badge>
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Название</TableHead>
            <TableHead className="font-semibold">Алиас</TableHead>
            <TableHead className="font-semibold">Ссылка</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <>
              <SocialLinkSkeleton />
              <SocialLinkSkeleton />
              <SocialLinkSkeleton />
              <SocialLinkSkeleton />
              <SocialLinkSkeleton />
              <SocialLinkSkeleton />
              <SocialLinkSkeleton />
            </>
          ) : (
            links.map((item, key) => (
              <TableRow key={key}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.alias}</TableCell>
                <TableCell>
                  <Link
                    href={item.href}
                    rel="noreferrer noopenner"
                    target="_blank"
                  >
                    {item.href}
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
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
