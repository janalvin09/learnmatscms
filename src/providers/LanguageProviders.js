import React, { useCallback } from 'react'
import { LanguageContext } from 'src/contexts/LanguageContext'
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetLanguages, CreateLanguage, UpdateLanguage, RemoveLanguage } from 'src/services/language';
import { useUserStore } from 'src/store/auth';
import { UseLanguageStore } from 'src/store/language';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export const LanguageProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setLanguages } = UseLanguageStore((state) => ({ setLanguages: state.setLanguages }));


  const { mutate: handleCreateLanguage, isLoading: createLanguageLoading } = useMutation({
    mutationFn: CreateLanguage,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['language'] });
        toast("new language created!", { type: "success" })
        navigate("/dashboard/language");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateLanguage, isLoading: updateLanguageLoading } = useMutation({
    mutationFn: UpdateLanguage,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['language'] });
        toast("language successfully updated", { type: "success" })
        navigate("/dashboard/language");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleRemoveLanguage } = useMutation({
    mutationFn: RemoveLanguage,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['language'] });
        toast("language successfully removed", { type: "success" })
        navigate("/dashboard/language");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  useQuery({
    queryKey: ["language"],
    queryFn: () => handleLanguage()
  })

  const handleLanguage = useCallback(async () => {
    if(token) {
      const languages = await GetLanguages(token)
      if(languages){
        setLanguages(languages)
        return languages
      }
    }
  }, [token, setLanguages])
  
  return (
    <LanguageContext.Provider
    value={{
      createLanguage: (payload) => { handleCreateLanguage(payload) },
      updateLanguage: (payload) => { handleUpdateLanguage(payload) },
      removeLanguage: (payload) => { handleRemoveLanguage(payload) },
      createLanguageLoading: createLanguageLoading,
      updateLanguageLoading: updateLanguageLoading
    }}
  >
    {children}
  </LanguageContext.Provider>
  )
}