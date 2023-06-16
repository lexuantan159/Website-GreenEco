import React, { useEffect } from 'react'
import MainHome from '../components/Home/MainHome'

const Home = () => {

  useEffect( () => {
    document.title = 'Trang chủ';
  })
  return (
    <div>
      <MainHome/>
    </div>
  )
}

export default Home