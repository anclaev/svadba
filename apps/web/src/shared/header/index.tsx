'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

import { LoginDialog } from '@/widgets/login-dialog'

import { useScroll } from '@/core/hooks/use-scroll'

export const Header = () => {
  const [pageIsScrolled, setPageIsScrolled] = useState<boolean>(false)
  const scrollPosition = useScroll()

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
      <Image
        src="/assets/logo.svg"
        alt="logo"
        width={40}
        height={40}
        className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
      />
      <span className="font-trajan text-[#D3A75E]">23/08/25</span>
      <TooltipProvider>
        <Tooltip delayDuration={2000}>
          <Dialog>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer w-[30px] h-[30px]"
                >
                  <Image
                    src="/assets/icons/login.svg"
                    alt="login"
                    width={30}
                    height={30}
                    className="w-[20px] h-[20px] md:w-[30px] md:h-[30px]"
                  />
                </Button>
              </TooltipTrigger>
            </DialogTrigger>
            <LoginDialog />
          </Dialog>
          <TooltipContent>
            <p>Вход</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  )
}
