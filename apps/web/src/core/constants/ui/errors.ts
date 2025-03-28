// Validation errors
export const SIGN_IN_FORM_VALIDATION_ERRORS = {
  LOGIN_NONEMPTY: 'Логин не может быть пустым.',
  PASSWORD_INVALID: 'Некорректный пароль.',
} as const

export const SIGN_UP_FORM_VALIDATION_ERRORS = {
  ...SIGN_IN_FORM_VALIDATION_ERRORS,
  NAME_NONEMPTY: 'Имя не может быть пустым.',
  SIDE_REQUIRED: 'Сторона обязательна.',
  ROLE_REQUIRED: 'Роль обязательна.',
  CONFIRM_PASSWORD_INVALID: 'Пароли не совпадают.',
} as const

// Turnstile error
export const TURNSTILE_ERROR = 'Пожалуйста, подтвердите, что вы человек'
