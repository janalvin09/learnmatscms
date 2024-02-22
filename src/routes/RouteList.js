import { Routes, Route, useLocation } from 'react-router-dom'


// SCREEN
import { HomeScreen } from '../components/Screens/HomeScreen'
import { useEffect } from 'react'


export  const RouteList = () => {
  const location = useLocation()
  
  useEffect(() => {
    console.log(location)
  }, [location])

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/Home" element={<HomeScreen />} />
    </Routes>
  )

}