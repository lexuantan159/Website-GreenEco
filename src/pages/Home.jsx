import React, { useEffect } from 'react'
import MainHome from '../components/Home/MainHome'

const Home = () => {

  useEffect( () => {
    document.title = 'Home';
  })
  return (
    <div>
      <MainHome/>
    </div>
  )
}

export default Home