import { z } from 'zod'

import { SIGN_IN_FORM_VALIDATE_ERRORS } from '@/core/enums/sign-in-form-validate-errors'

export const SignInFormSchema = z.object({
  login: z
    .string()
    .nonempty({ message: SIGN_IN_FORM_VALIDATE_ERRORS.LOGIN_NONEMPTY }),
  password: z
    .string()
    .min(8, { message: SIGN_IN_FORM_VALIDATE_ERRORS.PASSWORD_INVALID }),
})
