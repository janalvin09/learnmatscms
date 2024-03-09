import React, { useContext, useState, useCallback } from "react";
import { CreateButton } from "../Partial/CreateButton";
import { QuestionContext } from "src/contexts/QuestionContext";
import { UseQuestionStore } from "src/store/question";
import { UseMaterialStore } from "src/store/material";
import { UseAnswerStore } from "src/store/answer";
import { useUserStore } from "src/store/auth";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'
import { UtcDateFormatter, encodeURL, is_hasAnswer } from "src/utils/helpers";
import { DropDown } from "../Partial/Select";
import { lineTextFormatter } from "src/utils/helpers";
import _ from "lodash";


export const Question = () => {

  const { questions } = UseQuestionStore((state) => ({ questions: state.questions }));
  const { materials } = UseMaterialStore((state) => ({ materials: state.materials }));
  const { answers } = UseAnswerStore((state) => ({ answers: state.answers }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeQuestion } = useContext(QuestionContext)
  const [ selected, setSelected ] = useState()

  const questionCallBack = useCallback((questions, material_id) => {
    if(material_id) {
      const newQuestions = _.filter(questions, (i) => { return i.material_id === Number(material_id) })
      return newQuestions
    } else {
      return questions
    }
  }, [])

  const handleRemoveQuestion = (question_id) => {
    if(token) {
      let payload = {
        question_id,
        user: token
      }
      removeQuestion(payload)
    }
  }
  

  if(!questions?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no questions found!  
      </div>
    )
  }

  const getMaterialByQuestion = (material_id) => {
    const material = _.find(materials, { id: material_id })
    return lineTextFormatter(12, material.name)
  }

  return (
    <div className='question_main w-full p-8'>
      <h1 className="mb-8 text-4xl font-bold">List of Questions</h1>

        <div className="flex gap-2">
          <CreateButton
            destination={"/dashboard/question/create"} 
            styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
            label={"add question"}
          />
          <div className="w-1/4">
          <DropDown 
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={`h-full w-full border-2 p-2 rounded-lg outline-none appearance-none`}
              ariaPlaceHolder="by materials"
              required={false}
              data={materials}
            />
          </div>
        </div>
     

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!questionCallBack(questions, selected)?.length &&
          <div>no question found!</div>
        }
        {questionCallBack(questions, selected)?.length > 0 && questionCallBack(questions, selected).map((question, index) => {
          return (
            <div
            key={index}
            className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{lineTextFormatter(12, question.name)}</h2>
              <div className="w-[4.5rem] h-[4.5rem]">
                <Lottie animationData={book}/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 text-base px-4 mt-4">
                <span className="font-bold">Material</span> : {getMaterialByQuestion(question.material_id)}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Date</span> : {UtcDateFormatter(question.createdAt)}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Updated</span>  : {UtcDateFormatter(question.updatedAt)}
              </label>
            </div>
            <div className="flex justify-center gap-4 py-2">    
              <motion.span
                whileHover={{ scale: 1.5 }} 
                transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                className="font-bold text-green-700 cursor-pointer"
              >
                <Link to={`/dashboard/question/${encodeURL(question)}`}>
                  <BiSolidEdit size={"1.2rem"}/>
                </Link>
              </motion.span>
              {is_hasAnswer(answers, question.id) < 0 &&
              <motion.span
                onClick={() => handleRemoveQuestion(question.id)} 
                whileHover={{ scale: 1.5 }} 
                transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                className="font-bold text-red-400 cursor-pointer"
              >
                <AiFillDelete size={"1.2rem"}/>
              </motion.span>
              }
              </div>
          </div>
          )
        })}
        </div>
    </div>
    
  )
}
