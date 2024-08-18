import { Image } from '@nextui-org/image'
import Link from 'next/link'

import './Logo.css'

export const Logo = () => (
  <Link className='logo' href='/'>
    <Image
      width={302}
      height={19}
      title='Logo'
      alt='Logo'
      src='/assets/logo.svg'
    />
  </Link>
)

export default Logo
