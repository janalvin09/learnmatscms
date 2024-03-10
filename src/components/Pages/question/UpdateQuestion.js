import React, { useContext, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { decodeURL } from 'src/utils/helpers'
import { Controller, useForm } from "react-hook-form";
import { QuestionContext } from 'src/contexts/QuestionContext';
import { useUserStore } from 'src/store/auth';
import { UseClassLevelStore } from 'src/store/classlevel';
import { UseMaterialStore } from 'src/store/material';
import { DropDown } from 'src/components/Partial/Select';
import _ from "lodash";


export const UpdateQuestion = () => {
  const params = useParams()
  const { question } = params
  const { updateQuestion, updateQuestionLoading } = useContext(QuestionContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { classlevels } = UseClassLevelStore((state) => ({ classlevels: state.classlevels }));
  const { materials } = UseMaterialStore((state) => ({ materials: state.materials }));

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question_id: decodeURL(question).id,
      classlevel_id: decodeURL(question).classlevel_id,
      material_id: decodeURL(question).material_id,
      name: decodeURL(question).name,
    },
  });

  const onSubmit = (data) => {
    if(token) {
      let payload = {
        ...data,
        user: token
      }
      updateQuestion(payload)
    }
  }

  const materialCallback = useCallback((materials, classlevel_id) => {
    if(classlevel_id) {
      const newMaterials = _.filter(materials, (i) => { return i.classlevel_id === Number(classlevel_id) })
      return newMaterials
    } else {
      return materials
    }
  }, [])

  return (
    <div className='update-question-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg shadow-xl p-8 flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Update Question: </h1>

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
                    setValue("material_id", 0)
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

          <div className='material_field'>
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
                  ariaPlaceHolder="Choose materials"
                  required={true}
                  data={materialCallback(materials, watch("classlevel_id"))}
                />
              )}
              name="material_id"
            />
            {errors.material_id && (
              <p className="text-sm text-red-400 indent-2">materials is invalid*</p>
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
                    placeholder="enter a question name"
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
              disabled={updateQuestionLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {updateQuestionLoading ? "Please wait..." : "Update" }
            </button>
          </div>
      </form>    
    </div>
  )
}
