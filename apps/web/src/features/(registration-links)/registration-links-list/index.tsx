'use client'

import { useQuery } from '@tanstack/react-query'
import { SquarePen } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Dialog } from '@/shared/ui/dialog'
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

import { RegistrationLinkListItem } from './RegistrationLinkListItem'
import { RegistrationLinkListItemSkeleton } from './RegistrationLinkListItemSkeleton'

import { CreateRegistrationLinkDialog } from '../create-registration-link/CreateRegistrationLinkDialog'

import { usePagination } from '@/core/hooks/use-pagination'
import { getRegistrationLinksQuery } from '@/core/queries/(registration-links)'

import type {
  RegistrationLinkItemModel,
  RegistrationLinkModel,
} from '@/core/models/(registration-links)'

export const RegistrationLinksList = () => {
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
    size: 5,
    count: 1,
  })

  const [totalItems, setTotalItems] = useState<number>(1)

  const { data: res, isPending } = useQuery(
    getRegistrationLinksQuery({
      page: currentPage,
      size: pageSize,
    })
  )

  const [links, setLinks] = useState<RegistrationLinkItemModel[]>([])

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

  const [openCreateDialog, setCreateDialog] = useState<boolean>(false)

  const handleCreateLink = useCallback(
    (link: RegistrationLinkModel) => {
      if (link) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { owner, ...createdLink } = link

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
    (link: RegistrationLinkModel) => {
      if (link) {
        const currentLinkIndex = links.findIndex((item) => (item.id = link.id))

        if (currentLinkIndex !== -1) {
          const updatedLinks = [...links]

          updatedLinks[currentLinkIndex] = link

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
          Регистрационные ссылки <Badge variant="default">{totalItems}</Badge>
        </h2>
        <Button
          className="cursor-pointer"
          onClick={() => setCreateDialog(true)}
        >
          <SquarePen />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold w-[24px]"></TableHead>
            <TableHead className="font-semibold w-[120px]">Статус</TableHead>
            <TableHead className="font-semibold w-[120px]">Создана</TableHead>
            <TableHead className="font-semibold w-[120px]">Срок</TableHead>
            <TableHead className="font-semibold">Имя</TableHead>
            <TableHead className="font-semibold">Логин</TableHead>
            <TableHead className="font-semibold">Роль</TableHead>
            <TableHead className="font-semibold">Сторона</TableHead>
            <TableHead className="font-semibold  w-[42px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <>
              <RegistrationLinkListItemSkeleton />
              <RegistrationLinkListItemSkeleton />
              <RegistrationLinkListItemSkeleton />
              <RegistrationLinkListItemSkeleton />
              <RegistrationLinkListItemSkeleton />
            </>
          ) : (
            links.map((item, key) => (
              <RegistrationLinkListItem
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
      <Dialog open={openCreateDialog} onOpenChange={setCreateDialog}>
        <CreateRegistrationLinkDialog
          handleCreated={handleCreateLink}
          closeDialog={() => setCreateDialog(false)}
        />
      </Dialog>
    </section>
  )
}
