'use client'

import { LogOut, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useScroll } from '@/core/hooks/use-scroll'
import { useAuthStore } from '@/core/providers/auth-store-provider'
import { useDialogStore } from '@/core/providers/dialog-store-provider'

import { parseGuestRole } from '@/core/utils/parsers'

import { ConfirmLogoutDialog } from '@/widgets/confirm-logout-dialog'

import { AlertDialog, AlertDialogTrigger } from '@/shared/ui/alert-dialog'
import { Button, buttonVariants } from '@/shared/ui/button'
import { Skeleton } from '@/shared/ui/skeleton'

export const Header = () => {
  const [pageIsScrolled, setPageIsScrolled] = useState<boolean>(false)
  const scrollPosition = useScroll()

  const { user, loading } = useAuthStore((store) => store)

  const openLogin = useDialogStore((store) => store.openLogin)

  useEffect(() => {
    if (scrollPosition >= 50) {
      setPageIsScrolled(true)
    } else {
      setPageIsScrolled(false)
    }
  }, [scrollPosition])

  return (
    <header
      className={`fixed z-3 left-0 top-0 right-0 flex justify-between items-center drop-shadow-lg 
        pl-5 pr-5 pt-2.5 pb-2.5 select-none transition-all duration-500 ${pageIsScrolled ? 'bg-[#FAF6EF]' : 'bg-transparent'}`}
    >
      <Link href="/" className="grow-[0.33]">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
        />
      </Link>
      <span className="font-trajan text-[#D3A75E] grow-[0.33] text-center">
        23/08/25
      </span>

      <div className="grow-[0.33] flex items-center justify-end">
        {loading ? (
          <div className="flex items-center space-x-2 sm:space-x-3 opacity-75">
            <Skeleton className="h-7 w-7 rounded-full" />
            <div className="hidden sm:block space-y-2">
              <Skeleton className="h-2 w-[75px]" />
              <Skeleton className="h-1.5 w-[75px]" />
            </div>
            <Skeleton className="h-7 w-7 rounded-sm" />
          </div>
        ) : user ? (
          <div className="flex items-center space-x-2 sm:space-x-6">
            <Link
              href="/my"
              className="flex items-center space-x-0 sm:space-x-3"
            >
              <User strokeWidth={1} />
              <div className="hidden sm:flex flex-col">
                <span className="text-sm">{user.name}</span>
                <span className="text-xs">
                  {parseGuestRole(user.guest.role ?? 'GUEST')}
                </span>
              </div>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger>
                <div
                  className={`${buttonVariants({ variant: 'outline' })} cursor-pointer w-[30px] h-[30px] bg-transparent`}
                >
                  <LogOut strokeWidth={2} />
                </div>
              </AlertDialogTrigger>
              <ConfirmLogoutDialog />
            </AlertDialog>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer w-[30px] h-[30px]"
            onClick={openLogin}
          >
            <Image
              src="/assets/icons/login.svg"
              alt="login"
              width={25}
              height={25}
              className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]"
            />
          </Button>
        )}
      </div>
    </header>
  )
}
