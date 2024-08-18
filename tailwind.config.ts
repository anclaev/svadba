import { nextui } from '@nextui-org/react'

const config: any = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      colors: {
        accent: '#ffa15e',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'svadba',
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#ffa15e',
            },
          },
        },
      },
    }),
  ],
}

export default config
