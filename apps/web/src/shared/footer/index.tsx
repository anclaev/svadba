import Image from 'next/image'
import Link from 'next/link'

import { TELEGRAM_LINK } from '@/core/constants/social'

export const Footer = () => (
  <footer className="flex flex-row justify-between items-center pt-2.5 pb-2.5 pl-5 pr-5 bg-[#1e1e1e]">
    <Image
      src="/assets/logo.svg"
      alt="logo"
      width={40}
      height={40}
      className="w-[30px] h-[30px] md:w-[40px] md:h-40px]"
    />
    <span className="font-trajan text-[#DCB87F]">23/08/25</span>
    <Link href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
      <Image
        src="/assets/icons/telegram.svg"
        alt="Telegram"
        width={30}
        height={30}
        className="w-[20px] h-[20px] md:w-[30px] md:h-30px]"
      />
    </Link>
  </footer>
)
