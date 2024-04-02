import React, { useCallback } from 'react'
import { CategoryContext } from 'src/contexts/CategoryContext';
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query";
import { GetCategory, CreateCategory, UpdateCategory, RemoveCategory } from 'src/services/category';
import { useUserStore } from 'src/store/auth';
import { UseCategoryStore } from 'src/store/category';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"


export const CategoryProviders = ({ children }) => {
  const { token } = useUserStore((state) => ({ token: state.token }));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setCategories } = UseCategoryStore((state) => ({ setCategories: state.setCategories }));


  const { mutate: handleCreateCategory, isLoading: createCategoryLoading } = useMutation({
    mutationFn: CreateCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast("new category created!", { type: "success" })
        navigate("/dashboard/category");
      }, 
    onError: (err) => {  
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleUpdateCategory, isLoading: updateCategoryLoading } = useMutation({
    mutationFn: UpdateCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast("category successfully updated", { type: "success" })
        navigate("/dashboard/category");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  const { mutate: handleRemoveCategory } = useMutation({
    mutationFn: RemoveCategory,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast("category successfully removed", { type: "success" })
        navigate("/dashboard/category");
      }, 
    onError: (err) => {
      toast(err.response.data.message, { type: "warning" })
    },
  });

  useQuery({
    queryKey: ["category"],
    queryFn: () => handleCategory()
  })

  const handleCategory = useCallback(async () => {
    if(token) {
      const categories = await GetCategory(token)
      if(categories){
        setCategories(categories)
        return categories
      }
    }
  }, [token, setCategories])
  

  return (
    <CategoryContext.Provider
      value={{
        createCategory: (payload) => { handleCreateCategory(payload) },
        updateCategory: (payload) => { handleUpdateCategory(payload) },
        removeCategory: (payload) => { handleRemoveCategory(payload) },
        createCategoryLoading: createCategoryLoading,
        updateCategoryLoading: updateCategoryLoading
      }}
    >
    {children}
  </CategoryContext.Provider>
  )
}