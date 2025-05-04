import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '@/shared/logo'

import { TELEGRAM_LINK } from '@/core/constants/ui/social-links'

export const Footer = () => (
  <footer className="flex flex-row justify-between items-center pt-2.5 pb-2.5 pl-5 pr-5 bg-[#1e1e1e]">
    <Logo />
    <span className="text-sm text-[#DCB87F]">
      {process.env.NEXT_PUBLIC_APP_VERSION}
    </span>
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
