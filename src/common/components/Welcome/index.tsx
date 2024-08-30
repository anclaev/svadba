'use client'
import { getImageProps } from 'next/image'

import getBackgroundImage from '@utils/getBackgroundImage'
import { EVENT_DATE } from '@core/constants'
import useTimer from '@hooks/useTimer'

import './Welcome.css'

const Welcome = () => {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: 'Flower',
    width: 339,
    height: 700,
    src: '/assets/flower-1.webp',
  })

  const { days, hours, minutes, seconds } = useTimer(EVENT_DATE.toDate())

  const flowerImage = getBackgroundImage(srcSet)

  return (
    <section className='welcome'>
      <div
        className='welcome-flower welcome-flower--l'
        style={{ backgroundImage: flowerImage }}
      ></div>
      <div
        className='welcome-flower welcome-flower--r'
        style={{ backgroundImage: flowerImage }}
      ></div>
      <div className='welcome-content content flex justify-center items-center flex-col text-center'>
        <div className='welcome-desc'>
          <p>Дорогие гости!</p>
          <p>Скоро в нашей жизни состоится важное событие — наша свадьба!</p>
          <p>Мы с удовольствием хотим разделить этот день с вами через</p>
        </div>
        <div className='welcome-timer flex flex-row'>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>{days}</span>
            <span className='welcome-timer-item__title'>дней</span>
          </div>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>{hours}</span>
            <span className='welcome-timer-item__title'>часов</span>
          </div>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>{minutes}</span>
            <span className='welcome-timer-item__title'>минут</span>
          </div>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>{seconds}</span>
            <span className='welcome-timer-item__title'>секунд</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Welcome
