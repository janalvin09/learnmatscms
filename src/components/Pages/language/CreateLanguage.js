import React, { useContext } from 'react'
import { Controller, useForm } from "react-hook-form";
import { LanguageContext } from 'src/contexts/LanguageContext';
import { useUserStore } from 'src/store/auth';

export const CreateLanguage = () => {
  const { createLanguage, createLanguageLoading } = useContext(LanguageContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lang_code: "",
      name: ""
    },
  });

  const onSubmit = (data) => {
    if(token) {
      let payload = {
        ...data,
        user: token
      }
      createLanguage(payload)
    }
  }
  return (
    <div className='create-language-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg shadow-xl p-8 flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Create Language: </h1>
          <div className='langcode_field'>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9]+$/
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  value={value}
                  onChange={onChange}
                  type="text"
                  name="langcode"
                  id="langcode"
                  placeholder="enter language code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              )}
              name="lang_code"
            />
            {errors.lang_code && (
              <p className="text-sm text-red-400 indent-2">language code is invalid*</p>
            )}            
          </div>
          <div className='name_field'>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-zA-Z0-9]+$/
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter a language name"
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
              disabled={createLanguageLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {createLanguageLoading ? "Please wait..." : "Submit" }
            </button>
          </div>
      </form>
    </div>
  )
}
