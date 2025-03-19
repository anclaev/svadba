export const SIGN_IN_FORM_VALIDATION_ERRORS = {
  LOGIN_NONEMPTY: 'Логин не может быть пустым.',
  PASSWORD_INVALID: 'Некорректный пароль.',
} as const

export const SIGN_UP_FORM_VALIDATION_ERRORS = {
  ...SIGN_IN_FORM_VALIDATION_ERRORS,
  NAME_NONEMPTY: 'Имя не может быть пустым.',
  SIDE_REQUIRED: 'Сторона обязательна.',
  CONFIRM_PASSWORD_INVALID: 'Пароли не совпадают.',
} as const
