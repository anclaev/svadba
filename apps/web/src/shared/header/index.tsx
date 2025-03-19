'use client'

import Image from 'next/image'

import { Button } from '@/shared/ui/button'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

import { LoginDialog } from '@/widgets/login-dialog'

export const Header = () => {
  return (
    <header className="flex justify-between items-center pl-5 pr-5 pt-2.5 pb-2.5 select-none">
      <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
      <span className="font-trajan text-base">23/08/25</span>
      <TooltipProvider>
        <Tooltip delayDuration={2000}>
          <Dialog>
            <DialogTrigger asChild>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <Image
                    src="/assets/icons/login.svg"
                    alt="login"
                    width={30}
                    height={30}
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
