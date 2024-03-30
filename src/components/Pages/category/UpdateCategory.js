import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { decodeURL } from 'src/utils/helpers'
import { Controller, useForm } from "react-hook-form";
import { CategoryContext } from 'src/contexts/CategoryContext';
import { useUserStore } from 'src/store/auth';
import { UseClassLevelStore } from 'src/store/classlevel';
import { DropDown } from 'src/components/Partial/Select';

export const UpdateCategory = () => {
  const params = useParams()
  const { category } = params
  const { updateCategory, updateCategoryLoading } = useContext(CategoryContext)
  const { classlevels } = UseClassLevelStore((state) => ({ classlevels: state.classlevels }));
  const { token } = useUserStore((state) => ({ token: state.token }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      classlevel_id: decodeURL(category).classlevel_id,
      name: decodeURL(category).name,
    },
  });

  const onSubmit = (data) => {
    if(token) {
      let payload = {
        category_id: decodeURL(category).id,
        classlevel_id: data.classlevel_id,
        name: data.name,      
        user: token
      }
      updateCategory(payload)
    }
  }

  return (
    <div className='update-category-main min-h-screen bg-gray-200 w-full flex gap-2 justify-center items-center'>
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='form_container bg-white rounded-lg shadow-xl p-8 flex flex-col gap-4'>
      <h1 className='text-center text-2xl font-bold mb-4'> Update Category: </h1>

        <div className='classlevel_field'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <DropDown
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                className={`h-full w-full border-2 p-2 text-center rounded-lg outline-none appearance-none`}
                ariaPlaceHolder="Choose class level"
                required={true}
                data={classlevels}
              />
            )}
            name="classlevel_id"
          />
          {errors.classlevel_id && (
            <p className="text-sm text-red-400 indent-2">classlevel is invalid*</p>
          )}            
        </div>

        <div className='name_field'>
            <Controller
              control={control}
              rules={{
                required: true,
                // pattern: /^[a-zA-Z0-9]+$/
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  value={value}
                  onChange={onChange}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="enter a category name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              )}
              name="name"
            />
            {errors.name && (
              <p className="text-sm text-red-400 indent-2">name is invalid*</p>
            )}            
        </div>

        <div className="min-w-[20rem]">
          <button
            disabled={updateCategoryLoading}
            type="submit"
            className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
          >
              {updateCategoryLoading ? "Please wait..." : "Update" }
          </button>
        </div>
    </form>
  </div>
  )
}
