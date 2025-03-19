import Image from 'next/image'

import { OurBackground } from '@/features/our-background'
import { WelcomeSection } from '@/features/welcome-section'

export default function Home() {
  return (
    <main>
      <OurBackground />
      <WelcomeSection />
      <Image
        src="/assets/wedding-1.webp"
        alt="Wedding 1"
        width={1728}
        height={563}
      />
    </main>
  )
}
