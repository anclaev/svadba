import * as Sentry from '@sentry/nextjs'

import { validateEnvs } from '@/core/utils/env'

type NodeEnv = 'local' | 'test' | 'development' | 'staging' | 'production'

export async function register() {
  validateEnvs()

  const NODE_ENV: NodeEnv = process.env.NODE_ENV as NodeEnv

  console.log(
    ` \x1b[32m✓\x1b[0m Версия приложения: \x1b[36m${process.env.NEXT_PUBLIC_APP_VERSION}`
  )

  if (NODE_ENV !== 'production' && NODE_ENV !== 'staging') {
    return
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: 'https://6206ec56188f7b4fd2c6fdb0c2e6320f@o4508852529397760.ingest.us.sentry.io/4509056546045952',

      // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      environment: process.env.NODE_ENV,
      release: process.env.APP_VERSION,
    })
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: 'https://6206ec56188f7b4fd2c6fdb0c2e6320f@o4508852529397760.ingest.us.sentry.io/4509056546045952',

      // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
      tracesSampleRate: 1,

      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,
    })
  }
}
