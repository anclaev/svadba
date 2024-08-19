import Credentials from 'next-auth/providers/credentials'
import Vk from 'next-auth/providers/vk'
import NextAuth from 'next-auth'
import { ZodError } from 'zod'

import { signInSchema } from '@utils/zod'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Vk({
      clientId: process.env.AUTH_VK_ID,
      clientSecret: process.env.AUTH_VK_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null

          const { email, password } = await signInSchema.parseAsync(credentials)

          return user
        } catch (e) {
          if (e instanceof ZodError) {
            return null
          }
          return null
        }
      },
    }),
  ],
})
