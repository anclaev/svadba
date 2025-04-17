import { loggerOptionsFactory } from '@repo/shared'
import { createLogger } from 'winston'

import { APP_NAME } from '#/common/constants'

export const logger = createLogger(loggerOptionsFactory({ appName: APP_NAME }))
