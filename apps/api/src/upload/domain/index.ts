export * from './entities'
export * from './interfaces'
export * from './repositories'

export const UPLOAD_ERRORS = {
  UPLOAD_ALREADY_EXISTS: 'UPLOAD_ALREADY_EXISTS',
  UPLOAD_NOT_FOUND: 'UPLOAD_NOT_FOUND',
  UPLOAD_BAD_OWNER: 'UPLOAD_BAD_OWNER',
  UPLOAD_UNKNOWN_ERROR: 'UPLOAD_UNKNOWN_ERROR',
} as const

export type UPLOAD_ERRORS = (typeof UPLOAD_ERRORS)[keyof typeof UPLOAD_ERRORS]

export class UploadError extends Error {
  constructor(key: UPLOAD_ERRORS) {
    super(key)
    this.name = 'UploadException'
  }
}
