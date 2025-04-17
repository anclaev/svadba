import * as Sentry from '@sentry/nestjs'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

Sentry.init({
  dsn: 'https://987faca66c46ba0804d02d932d6cbe19@o4508852529397760.ingest.us.sentry.io/4509131449958400',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profileSessionSampleRate: 1.0,
  profileLifecycle: 'trace',
})
