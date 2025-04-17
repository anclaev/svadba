import { TimingEvent, User } from '#prisma'

import { IUploadPrismaModel } from './upload.model'

export interface ITimingEventPrismaModel extends TimingEvent {
  owner: User
  ownerId: string
  icon?: IUploadPrismaModel
  iconId: string | null
}
