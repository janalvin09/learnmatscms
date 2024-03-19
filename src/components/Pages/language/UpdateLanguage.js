import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { decodeURL } from 'src/utils/helpers'
import { Controller, useForm } from "react-hook-form";
import { LanguageContext } from 'src/contexts/LanguageContext';
import { useUserStore } from 'src/store/auth';

export const UpdateLanguage = () => {
  const params = useParams()
  const { language } = params
  const { updateLanguage, updateLanguageLoading } = useContext(LanguageContext)
  const { token } = useUserStore((state) => ({ token: state.token }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lang_code: decodeURL(language).lang_code,
      name: decodeURL(language).name,
    },
  });


  const onSubmit = (data) => {
    if(token) {
      let payload = {
        language_id: decodeURL(language).id,
        lang_code: data.lang_code,
        name: data.name,
        user: token
      }
      updateLanguage(payload)
    }
  }
  

  return (
    <div className='update-language-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg shadow-xl p-8 flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Update Language: </h1>
          <div className='langcode_field'>
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
                  // pattern: /^[a-zA-Z0-9]+$/
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
              disabled={updateLanguageLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {updateLanguageLoading ? "Please wait..." : "Update" }
            </button>
          </div>
      </form>
    </div>
  )
}
