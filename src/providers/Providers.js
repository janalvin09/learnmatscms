import React from "react"
import { NavRoutes } from "src/routes/NavRoutes"

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const Providers = () => {
  return (
    <React.Fragment>
      <NavRoutes />
      <ToastContainer />
    </React.Fragment>
  )
}