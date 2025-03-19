import { z } from 'zod'

import { SIGN_IN_FORM_VALIDATION_ERRORS } from '@/core/enums/validation-errors'

export const SignInFormSchema = z.object({
  login: z
    .string()
    .nonempty({ message: SIGN_IN_FORM_VALIDATION_ERRORS.LOGIN_NONEMPTY }),
  password: z
    .string()
    .min(8, { message: SIGN_IN_FORM_VALIDATION_ERRORS.PASSWORD_INVALID }),
})

export type SignInFormValues = z.infer<typeof SignInFormSchema>
