import React from "react"
import { NavRoutes } from "src/routes/NavRoutes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from 'react-router-dom'

// PROVIDERS
import { AuthProviders } from "./AuthProviders" 
import { TanstackProviders } from "./TanstackProviders"
import { ClassLevelProviders } from "./ClassLevelProviders"

export const Providers = () => {
  return (
    <React.Fragment>
      <Router>
        <TanstackProviders>
          <AuthProviders>
            <ClassLevelProviders>
              <NavRoutes />
              <ToastContainer />
            </ClassLevelProviders>
          </AuthProviders>
        </TanstackProviders>
      </Router>
    </React.Fragment>
  )
}