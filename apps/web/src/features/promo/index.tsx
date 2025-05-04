'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { useAuthStore } from '@/core/providers/auth-store-provider'

import { AuthForm } from '@/widgets/auth-form'
import './index.css'

export const Promo = () => {
  const user = useAuthStore((store) => store.user)

  return (
    !user &&
    process.env.NEXT_PUBLIC_ALLOWED_SIGN_UP === 'true' && (
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
            Пожалуйста, зарегистрируйтесь до 1 августа, чтобы мы могли
            филигранно организовать мероприятие.
          </span>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center justify-center grow"
          >
            <AuthForm className="promo__form" defaultValue="sign-up" />
          </motion.div>
          <div className="font-trajan">
            <motion.span
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
              viewport={{ once: true }}
              className="block mb-7 lg:mb-10"
            >
              Мы ждём вас на нашей свадьбе!
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeIn', delay: 0.8 }}
              viewport={{ once: true }}
              className="block text-3xl lg:text-4xl mb-2 lg:mb-3"
            >
              С любовью,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeIn', delay: 1.6 }}
              viewport={{ once: true }}
              className="block text-4xl lg:text-5xl"
            >
              Алина и Артём!
            </motion.span>
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
  )
}
