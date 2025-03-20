import { EnvSchema } from '@/core/schemes/env-schema'

export const validateEnvs = () => {
  const envs = EnvSchema.safeParse(process.env)

  if (!envs.success) {
    envs.error.errors.map((err) => {
      console.error(' ☓ ' + err.path[0] + ': ' + err.message)
    })

    throw new Error()
  }

  console.log(' ✓ Переменные окружения успешно загружены!')
}
