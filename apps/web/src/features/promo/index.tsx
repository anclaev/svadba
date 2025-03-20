import Image from 'next/image'

import { SignUpForm } from '@/widgets/login-dialog/sign-up-form'

import './index.css'

export const Promo = () => (
  <section className="flex flex-row relative">
    <div
      className="
      w-full
      sm:w-[75%]
      md:w-[50%] grow-0 z-1 shadow-2xl
    lg:w-auto lg:grow bg-wheat-100
    flex flex-col justify-between items-center 
    pb-10 pt-10
    lg:pb-20 lg:pt-20 pl-5 pr-5 text-center"
    >
      <span className="max-w-[550px] mb-10">
        Пожалуйста, зарегистрируйтесь до 1 августа, чтобы мы могли филигранно
        организовать мероприятие.
      </span>
      <div className="w-full flex flex-col items-center justify-center grow">
        <SignUpForm className="promo__form" />
      </div>
      <div className="font-trajan">
        <span className="block mb-7 lg:mb-10">
          Мы ждём вас на нашей свадьбе!
        </span>
        <span className="block text-3xl lg:text-4xl mb-2 lg:mb-3">
          С любовью,
        </span>
        <span className="block text-4xl lg:text-5xl">Алина и Артём!</span>
      </div>
    </div>
    <Image
      src="/assets/promo.webp"
      alt="Promo"
      width="736"
      height="1045"
      className="hidden sm:block grow z-0 absolute top-0 right-0 bottom-0 h-auto w-auto min-h-[100%] max-h-[100%] lg:max-h-[1100px] lg:relative"
    />
  </section>
)
