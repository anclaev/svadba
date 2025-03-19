import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { EnvSchema } from '@/env/schema'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateEnvs = () => {
  const envs = EnvSchema.safeParse(process.env)

  if (!envs.success) {
    envs.error.errors.map((err) => {
      console.error(' ☓ ' + err.path[0] + ': ' + err.message)
    })

    process.exit(0)
  }

  console.log(' ✓ Переменные окружения успешно загружены!')
}
