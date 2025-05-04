// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

if (
  process.env.NEXT_PUBLIC_NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_NODE_ENV === 'staging'
) {
  Sentry.init({
    dsn: 'https://6206ec56188f7b4fd2c6fdb0c2e6320f@o4508852529397760.ingest.us.sentry.io/4509056546045952',

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    release: process.env.NEXT_PUBLIC_APP_VERSION,
    environment: process.env.NEXT_PUBLIC_NODE_ENV,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  })
}

console.log(`Svadba Web \nRelease: ${process.env.NEXT_PUBLIC_APP_VERSION}`)
