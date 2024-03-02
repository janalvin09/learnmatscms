import React, { useCallback } from 'react'
import { TranslationContext } from 'src/contexts/TranslationContext';
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetTranslations, CreateTranslation, UpdateTranslation, RemoveTranslation } from 'src/services/translation';
import { useUserStore } from 'src/store/auth';
import { UseTranslationStore } from 'src/store/translation';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export const TranslationProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setTranslations } = UseTranslationStore((state) => ({ setTranslations: state.setTranslations }));

  const { mutate: handleCreateTranslation, isLoading: createTranslationLoading } = useMutation({
    mutationFn: CreateTranslation,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['translation'] });
        toast("new translation created!", { type: "success" })
        navigate("/dashboard/translation");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateTranslation, isLoading: updateTranslationLoading } = useMutation({
    mutationFn: UpdateTranslation,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['translation'] });
        toast("translation successfully updated", { type: "success" })
        navigate("/dashboard/translation");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleRemoveTranslation } = useMutation({
    mutationFn: RemoveTranslation,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['translation'] });
        toast("translation successfully removed", { type: "success" })
        navigate("/dashboard/translation");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  useQuery({
    queryKey: ["translation"],
    queryFn: () => handleTranslation()
  })

  const handleTranslation = useCallback(async () => {
    if(token) {
      const translations = await GetTranslations(token)
      if(translations){
        setTranslations(translations)
        return translations
      }
    }
  }, [token, setTranslations])
  

  return (
    <TranslationContext.Provider
      value={{
        createTranslation: (payload) => { handleCreateTranslation(payload) },
        updateTranslation: (payload) => { handleUpdateTranslation(payload) },
        removeTranslation: (payload) => { handleRemoveTranslation(payload) },
        createTranslationLoading: createTranslationLoading,
        updateTranslationLoading: updateTranslationLoading
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}