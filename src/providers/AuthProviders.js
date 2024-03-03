import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from 'src/contexts/AuthContext'
import { useUserStore } from 'src/store/auth';
import { GetUser, Login } from 'src/services/authentications';
import { toast } from "react-toastify"
import { EncryptUser } from 'src/utils/helpers';
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

import { UseClassLevelStore } from 'src/store/classlevel';
import { UseMaterialStore } from 'src/store/material';
import { UseQuestionStore } from 'src/store/question';
import { UseAnswerStore } from 'src/store/answer';
import { UseLanguageStore } from 'src/store/language';
import { UseTranslationStore } from 'src/store/translation';
import { UseResultStore } from 'src/store/result';

export const AuthProviders = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser, setToken, setUserLogout } = useUserStore((state) => ({
    setUser: state.setUser,
    setToken: state.setToken,
    setUserLogout: state.setUserLogout
  }));

  const { resetClasslevels} = UseClassLevelStore((state) => ({ resetClasslevels: state.resetClasslevels }));
  const { resetMaterials} = UseMaterialStore((state) => ({ resetMaterials: state.resetMaterials }));
  const { resetQuestions} = UseQuestionStore((state) => ({ resetQuestions: state.resetQuestions }));
  const { resetAnswers} = UseAnswerStore((state) => ({ resetAnswers: state.resetAnswers }));
  const { resetLanguages} = UseLanguageStore((state) => ({ resetLanguages: state.resetLanguages }));
  const { resetTranslations} = UseTranslationStore((state) => ({ resetTranslations: state.resetTranslations }));
  const { resetResults, resetUsers } = UseResultStore((state) => ({ resetResults: state.resetResults, resetUsers: state.resetUsers }));


  const { mutate: handleLoginUser, isLoading: loginLoading } = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['login'] });
        authenticate(data.access_token)
        toast("Login success!", { type: "success" })
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
});


  const login = (data) => {
    handleLoginUser(data)
  }

  const logout_debounce = _.debounce(() => {
    resetClasslevels()
    resetMaterials()
    resetQuestions()
    resetAnswers()
    resetLanguages()
    resetTranslations()
    resetResults()
    resetUsers()
  }, 1000)

  const authenticate = async(user) => {
    const userdetails = await GetUser(user)
    const AuthenticatedUser = EncryptUser(userdetails)
    setToken(user)
    setUser(AuthenticatedUser)
    navigate("/dashboard");
  }

  const logout = () => {
    setUserLogout()
    navigate("/login")
    toast("logout success!", { type: "success" })
    logout_debounce()
  }

  return (
    <AuthContext.Provider
      value={{
        login: (data) => { login(data) },
        authenticate: (user) => { authenticate(user) },
        logout: () => { logout() },
        loginLoading: loginLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
