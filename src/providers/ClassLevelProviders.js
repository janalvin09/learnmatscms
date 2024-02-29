import React, { useCallback } from 'react'
import { ClasslevelContext } from 'src/contexts/ClassLevelContext'
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetClassLevel, CreateClasslevel, UpdateClasslevel, RemoveClasslevel } from 'src/services/classlevel';
import { useUserStore } from 'src/store/auth';
import { UseClassLevelStore } from 'src/store/classlevel';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export const ClassLevelProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setClasslevels } = UseClassLevelStore((state) => ({ setClasslevels: state.setClasslevels }));

  const { mutate: handleCreateClasslevel, isLoading: createClassLevelLoading } = useMutation({
    mutationFn: CreateClasslevel,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['classlevel'] });
        toast("new classlevel created!", { type: "success" })
        navigate("/dashboard/classlevel");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateClasslevel } = useMutation({
    mutationFn: UpdateClasslevel,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['classlevel'] });
        toast("classlevel successfully updated", { type: "success" })
        navigate("/dashboard/classlevel");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });
  
  const { mutate: handleRemoveClasslevel } = useMutation({
    mutationFn: RemoveClasslevel,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['classlevel'] });
        toast("classlevel successfully removed", { type: "success" })
        navigate("/dashboard/classlevel");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  useQuery({
    queryKey: ["classlevel"],
    queryFn: () => handleClasslevel()
  })

  const handleClasslevel = useCallback(async () => {
    if(token) {
      const classlevels = await GetClassLevel(token)
      if(classlevels){
        setClasslevels(classlevels)
        return classlevels
      }
    }
  }, [token, setClasslevels])
  
  
  return (
    <ClasslevelContext.Provider
      value={{
        createClassLevel: (payload) => { handleCreateClasslevel(payload) },
        updateClassLevel: (payload) => { handleUpdateClasslevel(payload) },
        removeClassLevel: (payload) => { handleRemoveClasslevel(payload) },
        createClassLevelLoading: createClassLevelLoading
      }}
    >
      {children}
    </ClasslevelContext.Provider>
  )
}
