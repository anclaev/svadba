import { Upload } from './upload'

export abstract class UploadRepository {
  abstract create(upload: Upload): Promise<Upload | null>
  abstract findById(id: number): Promise<Upload | null>
  abstract findByOwner(ownerLogin: string): Promise<Upload | null>
  abstract findByOwnerId(ownerId: string): Promise<Upload | null>
  //   abstract save(upload: Upload): Promise<Upload>
}
