import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Svadba',
    short_name: 'The Svadba',
    description: 'Свадьба Артема и Алины',
    start_url: '/',
    orientation: 'portrait',
    lang: 'ru',
    display: 'standalone',
    background_color: '#FAF6EF',
    theme_color: '#FAF6EF',
    icons: [
      {
        src: '/fav/favicon-72x72.png',
        type: 'image/png',
        sizes: '72x72',
        purpose: 'any',
      },
      {
        src: '/fav/favicon-96x96.png',
        type: 'image/png',
        sizes: '96x96',
        purpose: 'maskable',
      },
      {
        src: '/fav/favicon-128x128.png',
        type: 'image/png',
        sizes: '128x128',
        purpose: 'any',
      },
      {
        src: '/fav/favicon-144x144.png',
        type: 'image/png',
        sizes: '144x144',
        purpose: 'maskable',
      },
      {
        src: '/fav/favicon-152x152.png',
        type: 'image/png',
        sizes: '152x152',
        purpose: 'any',
      },
      {
        src: '/fav/favicon-192x192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/fav/favicon-384x384.png',
        type: 'image/png',
        sizes: '384x384',
        purpose: 'any',
      },
      {
        src: '/fav/favicon-512x512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  }
}
