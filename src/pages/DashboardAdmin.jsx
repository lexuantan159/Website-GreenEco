import React, { useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { router } from '../routes'
import LayoutAdmin from './LayoutAdmin'
import AuthContext from '../context/authProvider'

const DashboardAdmin = () => {
  const {auth } = useContext(AuthContext)
  const navigate = useNavigate()
  if (auth.accessToken && auth.role === "User") {
    navigate('/');
  }
  return (
    <>
      <div className='w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex'>
          <h3 className='m-auto ml-[420px] text-5xl font-extrabold animate-bounce'>Welcome to dashboard <span className='text-primaryColor'>GREEN ECO</span></h3>
      </div>
    </>
  )
}

export default DashboardAdmin