import Questionnaire from '@components/Questionnaire'
import Location from '@components/Location'
import AboutUs from '@components/AboutAs'
import Welcome from '@components/Welcome'
import Timing from '@components/Timing'
import Dress from '@components/Dress'
import We from '@components/We'

import './Home.css'

export default function Home() {
  return (
    <main className='home'>
      <We />
      <Welcome />
      <AboutUs />
      <Timing />
      <Dress />
      <Location />
      <Questionnaire />
    </main>
  )
}
