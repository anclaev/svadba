import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { SignInForm } from '../sign-in-form'

export const LoginDialog = () => {
  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle className="text-center font-normal">
          Личный кабинет гостя
        </DialogTitle>
      </DialogHeader>
      <Tabs defaultValue="sign-in">
        <TabsList className="grid w-full grid-cols-2 mb-2.5 mt-2">
          <TabsTrigger value="sign-in">Вход</TabsTrigger>
          <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up">Форма регистрации</TabsContent>
      </Tabs>
    </DialogContent>
  )
}
