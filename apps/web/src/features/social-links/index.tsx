'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Badge } from '@/shared/ui/badge'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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

import { SocialLinkItemModel } from '@/core/models/social-link.model'
import { fetchSocialLinksQuery } from '@/core/queries/fetchSocialLinks.query'

export const SocialLinks = () => {
  const [page, setPage] = useState<number>(1)
  const [size, setSize] = useState<number>(10)
  const [pages, setPages] = useState<number>(1)
  const [total, setTotal] = useState<number>(1)

  const { data, isPending } = useQuery(
    fetchSocialLinksQuery({
      page,
      size,
    })
  )

  const [links, setLinks] = useState<SocialLinkItemModel[]>([])

  useEffect(() => {
    if (data && data.data) {
      setLinks(data.data)
      setTotal(data.meta!.total)
      setPages(data.meta!.lastPage)
    }
  }, [data])

  const paginationItems = useMemo(() => {
    const items = []

    for (let i = 1; i <= pages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={page === i}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }, [pages, page])

  const nextPageHandler = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [pages, page])

  const lastPageHandler = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  return (
    <section>
      <h2 className="py-3 font-medium text-lg">
        Социальные ссылки <Badge variant="default">{total}</Badge>
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
            <PaginationPrevious href="#" title="" onClick={lastPageHandler} />
          </PaginationItem>
          {paginationItems}
          <PaginationItem>
            <PaginationNext href="#" onClick={nextPageHandler} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  )
}
