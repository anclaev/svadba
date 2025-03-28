export type AppError = {
  message: string
}

export type ApiError = {
  statusCode: number
  message: string
  errors: { message: string }[]
}
