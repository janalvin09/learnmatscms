import React, { useContext } from 'react'
import { Controller, useForm } from "react-hook-form";
import { AnswerContext } from 'src/contexts/AnwerContext';
import { useUserStore } from 'src/store/auth';
import { UseQuestionStore } from 'src/store/question';
import { DropDown } from 'src/components/Partial/Select';

export const CreateAnswer = () => {
  const { createAnswer, createAnswerLoading } = useContext(AnswerContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { questions } = UseQuestionStore((state) => ({ questions: state.questions }));
  
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question_id: 0,
      name: ""
    },
  });

  const onSubmit = (data) => {
    if(token) {
      let payload = {
        ...data,
        user: token
      }
      createAnswer(payload)
    }
  }

  return (
    <div className='create-answer-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg shadow-xl p-8 flex flex-col gap-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Create Answer: </h1>

          <div className='question_field'>
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
                  ariaPlaceHolder="Choose questions"
                  required={true}
                  data={questions}
                />
              )}
              name="question_id"
            />
            {errors.question_id && (
              <p className="text-sm text-red-400 indent-2">question is invalid*</p>
            )}            
          </div>

          <div className='name_field'>
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /[\S\s]+[\S]+/
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter a material name"
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
              disabled={createAnswerLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {createAnswerLoading ? "Please wait..." : "Submit" }
            </button>
          </div>
      </form>    
    </div> 
  )
}
