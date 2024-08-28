import AboutUs from '@components/AboutAs'
import Welcome from '@components/Welcome'
import We from '@components/We'

import './Home.css'

export default function Home() {
  return (
    <main className='home'>
      <We />
      <Welcome />
      <AboutUs />
    </main>
  )
}
