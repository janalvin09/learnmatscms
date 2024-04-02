import React, { useContext } from 'react'
import { Controller, useForm } from "react-hook-form";
import { TranslationContext } from 'src/contexts/TranslationContext';
import { useUserStore } from 'src/store/auth';
import { UseLanguageStore } from 'src/store/language';
import { DropDown } from 'src/components/Partial/Select';

export const CreateTranslation = () => {

  const { createTranslation, createTranslationLoading } = useContext(TranslationContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { languages } = UseLanguageStore((state) => ({ languages: state.languages }));

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      language_id: 0,
      word: "",
      translation: ""
    },
  });

  const onSubmit = (data) => {
    if(token) {
      let payload = {
        ...data,
        user: token
      }
      createTranslation(payload)
    }
  }

  return (
    <div className='create-translation-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg shadow-xl w-1/2 p-8 flex flex-col gap-4 mt-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Create Translation: </h1>

          <div className='language_field'>
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
                  ariaPlaceHolder="Choose languages"
                  required={true}
                  data={languages}
                />
              )}
              name="language_id"
            />
            {errors.language_id && (
              <p className="text-sm text-red-400 indent-2">language is invalid*</p>
            )}            
          </div>

          <div className='word_field'>
              <Controller
                control={control}
                rules={{
                  required: true,
                  // pattern: /^[a-zA-Z0-9]+$/
                }}
                render={({ field: { onChange, value } }) => (
                  <textarea
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="word"
                    id="word"
                    placeholder="enter a phrase to translate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                )}
                name="word"
              />
              {errors.word && (
                <p className="text-sm text-red-400 indent-2">word is invalid*</p>
              )}            
          </div>

          <div className='translation_field'>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <textarea
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="translation"
                    id="translation"
                    placeholder="enter a translation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                )}
                name="translation"
              />
              {errors.translation && (
                <p className="text-sm text-red-400 indent-2">translation is invalid*</p>
              )}            
          </div>

          <div className="min-w-[20rem]">
            <button
              disabled={createTranslationLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {createTranslationLoading ? "Please wait..." : "Submit" }
            </button>
          </div>
      </form>
    </div>
  )
}
