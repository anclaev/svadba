import Image from 'next/image'

import { Dialog, DialogTrigger } from '../ui/dialog'
import { LoginDialog } from '../login-dialog'
import { Button } from '../ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

import LoginIcon from '@/assets/login.svg'

import './index.css'

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
                  <LoginIcon className="size-7.5 header__login" />
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
