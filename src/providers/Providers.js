import React from "react"
import { NavRoutes } from "src/routes/NavRoutes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { TanstackProviders } from "./TanstackProviders"

export const Providers = () => {
  return (
    <React.Fragment>
      <TanstackProviders>
        <NavRoutes />
        <ToastContainer />
      </TanstackProviders>
    </React.Fragment>
  )
}