'use client'

import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { CreatePopover } from '@/shared/create-popover'
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
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

import { CreateSocialLinkForm } from '../create-social-link/CreateSocialLinkForm'
import { SocialLinkListItem } from './SocialLinkListItem'
import { SocialLinkListItemSkeleton } from './SocialLinkListItemSkeleton'

import { usePagination } from '@/core/hooks/use-pagination'
import { getSocialLinksQuery } from '@/core/queries/getSocialLinks.query'

import type {
  SocialLinkItemModel,
  SocialLinkModel,
} from '@/core/models/social-link.model'
import { toast } from 'sonner'

export const SocialLinksList = () => {
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
    size: 10,
    count: 1,
  })

  const [totalItems, setTotalItems] = useState<number>(1)

  const { data: res, isPending } = useQuery(
    getSocialLinksQuery({
      page: currentPage,
      size: pageSize,
    })
  )

  const [links, setLinks] = useState<SocialLinkItemModel[]>([])

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
      setLinks(res.data)
      setTotalItems(res.meta!.total)
      setPagesCount(res.meta!.lastPage)
    }
  }, [res, setPagesCount])

  const handleCreateLink = useCallback(
    (link: SocialLinkModel) => {
      if (link) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { creator, ...createdLink } = link

        setLinks([...links, createdLink])
        setTotalItems(totalItems + 1)
      }
    },
    [links, totalItems]
  )

  const handleDeleteLink = useCallback(
    (id: string) => {
      if (id) {
        const newLinks = links.filter((link) => link.id !== id)
        setLinks(newLinks)
        setTotalItems(totalItems - 1)
      }
    },
    [links, totalItems]
  )

  const handleUpdateLink = useCallback(
    (link: SocialLinkModel) => {
      if (link) {
        const currentLinkIndex = links.findIndex((item) => (item.id = link.id))

        if (currentLinkIndex !== -1) {
          const updatedLinks = [...links]

          updatedLinks.splice(currentLinkIndex, 1, link)

          setLinks(updatedLinks)
        }

        toast('Ссылка успешно обновлена.')
      }
    },
    [links]
  )

  return (
    <section>
      <div className="flex justify-between items-center space-x-3">
        <h2 className="py-3 font-medium text-lg">
          Социальные ссылки <Badge variant="default">{totalItems}</Badge>
        </h2>
        <CreatePopover variant="default" title={<SquarePen />}>
          <CreateSocialLinkForm handleCreated={handleCreateLink} />
        </CreatePopover>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Название</TableHead>
            <TableHead className="font-semibold">Алиас</TableHead>
            <TableHead className="font-semibold">Ссылка</TableHead>
            <TableHead className="font-semibold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <>
              <SocialLinkListItemSkeleton />
              <SocialLinkListItemSkeleton />
              <SocialLinkListItemSkeleton />
              <SocialLinkListItemSkeleton />
              <SocialLinkListItemSkeleton />
              <SocialLinkListItemSkeleton />
              <SocialLinkListItemSkeleton />
            </>
          ) : (
            links.map((item, key) => (
              <SocialLinkListItem
                item={item}
                key={key}
                handleUpdated={handleUpdateLink}
                handleDeleted={handleDeleteLink}
              />
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
