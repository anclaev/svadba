import { nextui } from '@nextui-org/react'

const config: {
  plugins: ReturnType<Plugin>[]
  theme: { extend: {} }
  darkMode: string
  content: string[]
} = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'svadba',
    }),
  ],
}

export default config
