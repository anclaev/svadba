'use client'

import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { FC } from 'react'

import { Button } from '@/shared/ui/button'

const MotionShield = motion(ShieldAlert)

export const AccountIsUnverified: FC = () => (
  <main className="w-full min-h-[calc(100vh-200px)] px-0 md:px-4 flex justify-center items-center text-center">
    <div className="flex flex-col items-center space-y-5">
      <MotionShield
        size={128}
        strokeWidth={1}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeIn' }}
      />
      <div className="space-y-3">
        <motion.span
          className="text-base md:text-xl block"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1, ease: 'easeIn' }}
        >
          Ваш аккаунт не подтверждён
        </motion.span>
        <motion.p
          className="text-sm md:text-base block"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 2, ease: 'easeIn' }}
        >
          Нам требуется время, чтобы проверить, что вы — это вы
        </motion.p>
      </div>
      <motion.a
        href="https://t.me/anclaev"
        target="_blank"
        rel="noopenner noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 3, ease: 'easeIn' }}
      >
        <Button className="cursor-pointer" variant={'outline'}>
          Связаться с нами
        </Button>
      </motion.a>
    </div>
  </main>
)
