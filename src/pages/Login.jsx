import React, { useEffect } from 'react'
import FormLogin from '../components/FormLogin/FormLogin'

const Login = () => {

  useEffect( () => {
    document.title = 'Đăng nhập';
  })
  return (
    <div>
      <FormLogin/>
    </div>
  )
}

export default Login