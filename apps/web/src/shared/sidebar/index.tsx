/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  Bolt,
  CalendarDays,
  Folder,
  Gauge,
  Scroll,
  ShieldUser,
  Shirt,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useMemo } from 'react'

import { Separator } from '../ui/separator'

import { GuestRole } from '@/core/models/user.model'
import { useAuthStore } from '@/core/providers/auth-store-provider'
import { BLOCKED_PAGE, UNVERIFIED_PAGE } from '@/middleware'

import './index.css'

type SidebarProps = {
  className?: string
}

type NavItem = {
  title: string
  href: string
  icon: any
  separator?: boolean
  roles?: GuestRole[]
}

const navItems: NavItem[] = [
  {
    title: 'Панель',
    href: '/dashboard',
    icon: Gauge,
  },
  {
    title: 'План дня',
    href: '/timing',
    icon: CalendarDays,
  },
  {
    title: 'Дресс-код',
    href: '/dresscode',
    icon: Shirt,
  },
  {
    title: 'Квесты',
    href: '/quests',
    icon: Scroll,
  },
  {
    title: 'Профиль',
    href: '/profile',
    icon: ShieldUser,
  },
  {
    separator: true,
    title: 'Гости',
    href: '/guests',
    icon: UsersRound,
    roles: ['BRIDE', 'PARENT', 'GROOM'],
  },
  {
    title: 'Файлы',
    href: '/files',
    icon: Folder,
    roles: ['BRIDE', 'PARENT', 'GROOM'],
  },
  {
    separator: true,
    title: 'Система',
    href: '/system',
    icon: Bolt,
    roles: ['GROOM'],
  },
]

export const Sidebar: FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname()
  const user = useAuthStore((store) => store.user)

  const isServicePage = useMemo(
    () =>
      pathname.startsWith(UNVERIFIED_PAGE) || pathname.startsWith(BLOCKED_PAGE),
    [pathname]
  )

  return (
    !isServicePage && (
      <nav
        className={`${className} left-[50%] md:left-auto overflow-x-scroll md:overflow-auto transform-[translateX(-50%)] md:transform-none rounded-2xl bg-white space-y-0 flex md:block w-auto max-w-[calc(100%-40px)]  md:w-[30%] md:max-w-[250px] shadow z-10`}
      >
        {navItems.map(
          (item) =>
            (item.roles && user
              ? item.roles.includes(user.guest.role)
              : true) &&
            user && (
              <div
                key={item.title}
                className={`w-full transition-all duration-400 ${pathname.includes('/-' + item.href) ? 'bg-wheat-300' : ''}`}
              >
                {item.separator && (
                  <Separator className="transform-separator" />
                )}
                <Link
                  href={`/-${item.href}`}
                  className={`px-4 py-4 flex items-center space-x-0 md:space-x-2 text-sm`}
                >
                  <item.icon
                    strokeWidth={1.5}
                    width={24}
                    height={24}
                    className=" w-[18px] h-[18px] md:w-[24px] md:h-[24px]"
                  />
                  <span className="hidden md:inline-block">{item.title}</span>
                </Link>
              </div>
            )
        )}
      </nav>
    )
  )
}
