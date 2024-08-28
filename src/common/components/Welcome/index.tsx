'use client'
import { getImageProps } from 'next/image'

import getBackgroundImage from '@utils/getBackgroundImage'

import './Welcome.css'

export default function Welcome() {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: 'Flower',
    width: 339,
    height: 700,
    src: '/assets/flower-1.webp',
  })

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
          <p>
            Дорогие гости! Скоро в нашей жизни состоится важное событие — наша
            свадьба!
          </p>
        </div>
        <p>Мы с удовольствием хотим разделить этот день с вами через</p>
        <div className='welcome-timer flex flex-row'>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>375</span>
            <span className='welcome-timer-item__title'>дней</span>
          </div>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>17</span>
            <span className='welcome-timer-item__title'>часов</span>
          </div>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>31</span>
            <span className='welcome-timer-item__title'>минут</span>
          </div>
          <div className='welcome-timer-item flex flex-col'>
            <span className='welcome-timer-item__value'>07</span>
            <span className='welcome-timer-item__title'>секунд</span>
          </div>
        </div>
      </div>
    </section>
  )
}
