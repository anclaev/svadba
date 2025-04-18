import { session } from 'grammy'

import { initial } from '../utils'

export const sessionMiddleware = session({ initial })
