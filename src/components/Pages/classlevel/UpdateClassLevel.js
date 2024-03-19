import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { decodeURL } from 'src/utils/helpers'
import { Controller, useForm } from "react-hook-form";
import { ClasslevelContext } from 'src/contexts/ClassLevelContext';
import { useUserStore } from 'src/store/auth';

export const UpdateClassLevel = () => {

  const params = useParams()
  const { classlevel } = params
  const { updateClassLevel, updateClassLevelLoading } = useContext(ClasslevelContext)
  const { token } = useUserStore((state) => ({ token: state.token }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: decodeURL(classlevel).name,
    },
  });


  const onSubmit = (data) => {
    if(token) {
      let payload = {
        classlevel_id: decodeURL(classlevel).id,
        name: data.name,
        user: token
      }
      updateClassLevel(payload)
    }
  }
  

  return (
    <div className='update-class-level-create-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg shadow-xl p-8 flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Update class level: </h1>
          <div className='name_field'>
              <Controller
                control={control}
                rules={{
                  required: true,
                  // pattern: /^[a-zA-Z0-9]+$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter a class level name"
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
              disabled={updateClassLevelLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {updateClassLevelLoading ? "Please wait..." : "Update" }
            </button>
          </div>
      </form>
    </div>
  )
}
