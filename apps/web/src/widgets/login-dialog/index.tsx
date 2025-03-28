'use client'
import { XIcon } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import { useDialogStore } from '@/core/providers/dialog-store-provider'

import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

export const LoginDialog = () => {
  const { isLoginOpen, closeLogin } = useDialogStore((store) => store)

  return (
    <Dialog open={isLoginOpen}>
      <DialogContent
        className="sm:max-w-[400px] max-h-[calc(100vh-42px)] overflow-y-auto"
        aria-describedby="Вход"
      >
        <DialogHeader>
          <DialogTitle className="text-center font-normal">
            Добро пожаловать!
          </DialogTitle>
          <DialogClose
            className="cursor-pointer ring-offset-background focus:ring-ring bg-accent text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            onClick={closeLogin}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <Tabs defaultValue="sign-in">
          <TabsList className="grid w-full grid-cols-2 mb-2.5 mt-2 select-none">
            <TabsTrigger value="sign-in">Вход</TabsTrigger>
            <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
