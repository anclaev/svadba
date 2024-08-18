import { Navbar, NavbarContent } from '@nextui-org/navbar'
import Logo from '@components/Logo'

import './Header.css'

const Header = () => {
  return (
    <Navbar className='absolute bg-transparent text-white header'>
      <NavbarContent className='header-content'>
        <span />
        <Logo />
        <span />
      </NavbarContent>
    </Navbar>
  )
}

export default Header
