import resolveConfig from 'tailwindcss/resolveConfig'
import { nextui } from '@nextui-org/react'

const nextUiPlugin: any = (config: any) => nextui(config)

const ebony = {
  100: '#8F9886',
  200: '#7B8471',
  300: '#717967',
  400: '#676E5E',
  500: '#595F51',
  600: '#52584B',
  700: '#484D42',
  800: '#3E4238',
  900: '#34372F',
}

const battleship = {
  100: '#B9BAB5',
  200: '#AFB0AB',
  300: '#A5A6A0',
  400: '#9B9C96',
  500: '#8F908A',
  600: '#878881',
  700: '#7D7E77',
  800: '#73746D',
  900: '#686963',
}

const chamoisee = {
  100: '#C5A781',
  200: '#BF9D73',
  300: '#B89365',
  400: '#B28957',
  500: '#A67E4D',
  600: '#9A7447',
  700: '#8C6A40',
  800: '#7E5F3A',
  900: '#705533',
}

const earth = {
  100: '#E5CA9F',
  200: '#E0C18F',
  300: '#DCB87F',
  400: '#D8AF6F',
  500: '#D3A75E',
  600: '#CF9E4F',
  700: '#CA953F',
  800: '#C08B35',
  900: '#B07F30',
}

const wheat = {
  100: '#FAF6EF',
  200: '#F6EEE0',
  300: '#F1E6D0',
  400: '#ECDEC0',
  500: '#E6D3AB',
  600: '#E3CEA1',
  700: '#DEC691',
  800: '#D9BE81',
  900: '#D5B772',
}

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
        'spin-slow': 'spin 12s linear infinite',
      },
      fontFamily: {
        trajanPro: ['var(--font-trajan-pro)'],
        montserrat: ['var(--font-montserrat)'],
      },
    },
    colors: {
      base: '#1e1e1e',
      ebony,
      battleship,
      chamoisee,
      earth,
      wheat,
    },
  },
  darkMode: 'class',
}

const resolved = resolveConfig(config)

const { colors } = resolved.theme as any

config.plugins = [
  nextUiPlugin({
    prefix: 'svadba',
    themes: {
      svadba: {
        extend: 'light',
        colors: {
          background: {
            DEFAULT: colors['wheat']['100'],
          },
          foreground: {
            DEFAULT: colors['chamoisee']['700'],
          },
          primary: {
            DEFAULT: colors['earth']['500'],
          },
          ebony: {
            DEFAULT: ebony['500'],
            ...ebony,
          },
          battleship: {
            DEFAULT: battleship['500'],
            ...battleship,
          },
          chamoisee: {
            DEFAULT: chamoisee['500'],
            ...chamoisee,
          },
          earth: {
            DEFAULT: earth['500'],
            ...earth,
          },
          wheat: {
            DEFAULT: wheat['500'],
            ...wheat,
          },
        },
      },
    },
  }),
]

export default config
