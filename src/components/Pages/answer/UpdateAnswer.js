import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { decodeURL } from 'src/utils/helpers'
import { Controller, useForm } from "react-hook-form";
import { AnswerContext } from 'src/contexts/AnwerContext';
import { useUserStore } from 'src/store/auth';
import { UseQuestionStore } from 'src/store/question';
import { DropDown } from 'src/components/Partial/Select';


export const UpdateAnswer = () => {
  const params = useParams()
  const { answer } = params
  const { updateAnswer, updateAnswerLoading } = useContext(AnswerContext)
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { questions } = UseQuestionStore((state) => ({ questions: state.questions }));


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      answer_id: decodeURL(answer).id,
      question_id: decodeURL(answer).question_id,
      is_correct: decodeURL(answer).is_correct,
      name: decodeURL(answer).name,
    },
  });

  const onSubmit = (data) => {
    if(token) {
      let payload = {
        ...data,
        user: token
      }
      updateAnswer(payload)
    }
  }
  

  return (
    <div className='update-answer-main min-h-screen bg-gray-200 w-full flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className='form_container bg-white rounded-lg w-1/2 shadow-xl p-8 flex flex-col gap-4 mt-4'>
        <h1 className='text-center text-2xl font-bold mb-4'> Update Answer: </h1>

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

          <div className='is_correct_field'>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              // }}

              render={({ field: { onChange, onBlur, ref, value } }) => (
                <div className='flex gap-2'>
                <span className='font-bold'>is_correct :</span>
                <label>
                  <input
                    ref={ref}
                    type="radio"
                    onBlur={onBlur}
                    onChange={() => onChange(true)}
                    checked={value === true}
                  />
                  True
                </label>
                <label>
                  <input
                    ref={ref}
                    type="radio"
                    onBlur={onBlur}
                    onChange={() => onChange(false)}
                    checked={value === false}
                  />
                  False
                </label>
              </div>
              )}
              name="is_correct"
            />
            {errors.is_correct && (
              <p className="text-sm text-red-400 indent-2">correct option is invalid*</p>
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
                  <textarea
                    value={value}
                    onChange={onChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="enter a answer"
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
              disabled={updateAnswerLoading}
              type="submit"
              className="w-full text-gray-900 bg-green-400 flex justify-center items-cente selection:cursor-pointer mt-2 mb-4 p-2 rounded-lg"
            >
                {updateAnswerLoading ? "Please wait..." : "Update" }
            </button>
          </div>
      </form>    
    </div>
  )
}
