import { z } from 'zod'

import { SIGN_UP_FORM_VALIDATION_ERRORS } from '@/core/constants/ui/errors'

export const SignUpFormSchema = z
  .object({
    name: z
      .string({ message: SIGN_UP_FORM_VALIDATION_ERRORS.NAME_NONEMPTY })
      .nonempty({ message: SIGN_UP_FORM_VALIDATION_ERRORS.NAME_NONEMPTY }),
    login: z
      .string({ message: SIGN_UP_FORM_VALIDATION_ERRORS.LOGIN_NONEMPTY })
      .nonempty({ message: SIGN_UP_FORM_VALIDATION_ERRORS.LOGIN_NONEMPTY }),
    side: z.enum(['GROOM', 'BRIDE'], {
      message: SIGN_UP_FORM_VALIDATION_ERRORS.SIDE_REQUIRED,
    }),
    role: z.enum(['GUEST', 'CLOSE', 'PARENT'], {
      message: SIGN_UP_FORM_VALIDATION_ERRORS.ROLE_REQUIRED,
    }),
    password: z
      .string({ message: SIGN_UP_FORM_VALIDATION_ERRORS.PASSWORD_INVALID })
      .min(8, { message: SIGN_UP_FORM_VALIDATION_ERRORS.PASSWORD_INVALID }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: SIGN_UP_FORM_VALIDATION_ERRORS.CONFIRM_PASSWORD_INVALID,
    path: ['confirmPassword'],
  })

export type SignUpFormValues = z.infer<typeof SignUpFormSchema>
