import React from 'react'
import { LazyImage } from '../Lazy/Lazy'
import logo from 'src/assets/logo.webp'

export const Dashboard = () => {
  return (
    <div className='dashboard_main w-full flex justify-center items-center'>
      <div className='mt-24'>
        <LazyImage 
          src={logo}
          alt="app logo"
          width={350}
          height={350}
        />
      </div>
    </div>
    
  )
}
