import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from 'src/contexts/AuthContext'
import { useUserStore } from 'src/store/auth';
import { GetUser, Login } from 'src/services/authentications';
import { toast } from "react-toastify"
import { EncryptUser } from 'src/utils/helpers';
import { useNavigate } from "react-router-dom";

export const AuthProviders = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setUser, setToken, setUserLogout } = useUserStore((state) => ({
    setUser: state.setUser,
    setToken: state.setToken,
    setUserLogout: state.setUserLogout
  }));

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
