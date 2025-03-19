import { OurBackground } from '@/features/our-background'
import { WelcomeSection } from '@/features/welcome-section'
import { Section } from '@/shared/section'

import { Timing } from '@/features/timing'

import { HOME_SECTIONS } from '@/core/constants/home-sections'
import { DressCode } from '@/features/dress-code'

export default function Home() {
  return (
    <main>
      <OurBackground />
      <WelcomeSection />
      {HOME_SECTIONS.map((section) => {
        switch (section.alias) {
          case 'timing': {
            return <Timing section={section} key={section.alias} />
          }
          case 'dress-code': {
            return <DressCode section={section} key={section.alias} />
          }
          case 'place': {
            return (
              <Section {...section} key={section.alias}>
                place
              </Section>
            )
          }
          default: {
            return <Section {...section} key={section.alias}></Section>
          }
        }
      })}
    </main>
  )
}
