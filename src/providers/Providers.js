import React from "react"
import { NavRoutes } from "src/routes/NavRoutes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from 'react-router-dom'

// PROVIDERS
import { TanstackProviders } from "./TanstackProviders"
import { AuthProviders } from "./AuthProviders" 

export const Providers = () => {
  return (
    <React.Fragment>
      <Router>
        <TanstackProviders>
          <AuthProviders>
              <NavRoutes />
              <ToastContainer />
          </AuthProviders>
        </TanstackProviders>
      </Router>
    </React.Fragment>
  )
}