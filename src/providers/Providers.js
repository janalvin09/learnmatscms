import React from "react"
import { NavRoutes } from "src/routes/NavRoutes"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from 'react-router-dom'

// PROVIDERS
import { AuthProviders } from "./AuthProviders" 
import { TanstackProviders } from "./TanstackProviders"
import { ClassLevelProviders } from "./ClassLevelProviders"
import { MaterialProviders } from "./MaterialProviders"
import { QuestionProviders } from "./QuestionProviders"
import { AnswerProviders } from "./AnswerProviders"
import { LanguageProviders } from "./LanguageProviders"
import { useUserStore } from "src/store/auth"

export const Providers = () => {
  const { user } = useUserStore((state) => ({ user: state.user }));
  
  return (
    <React.Fragment>
      <Router>
        <TanstackProviders>
          {user ? (
            <AuthProviders>
              <ClassLevelProviders>
                <MaterialProviders>
                  <QuestionProviders>
                    <AnswerProviders>
                      <LanguageProviders>
                        <NavRoutes />
                        <ToastContainer />      
                      </LanguageProviders>
                    </AnswerProviders>
                  </QuestionProviders>
                </MaterialProviders>
              </ClassLevelProviders>
            </AuthProviders>
          ) : (
            <AuthProviders>
              <NavRoutes />
              <ToastContainer />  
            </AuthProviders>
          )}
        </TanstackProviders>
      </Router>
    </React.Fragment>
  )
}