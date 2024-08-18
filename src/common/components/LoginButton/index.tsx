import { WithClass } from '@interfaces/props'

import './LoginButton.css'

const LoginButton = ({ className }: WithClass) => {
  return <button className={`login-btn ${className ?? ''}`} />
}

export default LoginButton
