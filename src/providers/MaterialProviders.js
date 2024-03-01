import React, { useCallback } from 'react'
import { MaterialContext } from 'src/contexts/MaterialContext'
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetMaterial, CreateMaterial, UpdateMaterial, RemoveMaterial } from 'src/services/material';
import { useUserStore } from 'src/store/auth';
import { UseMaterialStore } from 'src/store/material';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

export const MaterialProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setMaterials } = UseMaterialStore((state) => ({ setMaterials: state.setMaterials }));


  const { mutate: handleCreateMaterial, isLoading: createMaterialLoading } = useMutation({
    mutationFn: CreateMaterial,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['material'] });
        toast("new material created!", { type: "success" })
        navigate("/dashboard/material");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateMaterial, isLoading: updateMaterialLoading } = useMutation({
    mutationFn: UpdateMaterial,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['material'] });
        toast("material successfully updated", { type: "success" })
        navigate("/dashboard/material");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleRemoveMaterial } = useMutation({
    mutationFn: RemoveMaterial,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['material'] });
        toast("material successfully removed", { type: "success" })
        navigate("/dashboard/material");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  useQuery({
    queryKey: ["material"],
    queryFn: () => handleMaterial()
  })

  const handleMaterial = useCallback(async () => {
    if(token) {
      const materials = await GetMaterial(token)
      if(materials){
        setMaterials(materials)
        return materials
      }
    }
  }, [token, setMaterials])
  


  return (
    <MaterialContext.Provider
      value={{
        createMaterial: (payload) => { handleCreateMaterial(payload) },
        updateMaterial: (payload) => { handleUpdateMaterial(payload) },
        removeMaterial: (payload) => { handleRemoveMaterial(payload) },
        createMaterialLoading: createMaterialLoading,
        updateMaterialLoading: updateMaterialLoading
      }}
    >
      {children}
    </MaterialContext.Provider>
  )
}
