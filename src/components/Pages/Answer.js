import React, { useContext, useState, useCallback } from "react";
import { CreateButton } from "../Partial/CreateButton";
import { AnswerContext } from "src/contexts/AnwerContext";
import { UseAnswerStore } from "src/store/answer";
import { UseQuestionStore } from "src/store/question";
import { useUserStore } from "src/store/auth";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'
import { UtcDateFormatter, encodeURL } from "src/utils/helpers";
import { DropDown } from "../Partial/Select";
import _ from "lodash";



export const Answer = () => {

  const { questions } = UseQuestionStore((state) => ({ questions: state.questions }));
  const { answers } = UseAnswerStore((state) => ({ answers: state.answers }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeAnswer } = useContext(AnswerContext)
  const [ selected, setSelected ] = useState()


  const answerCallback = useCallback((answers, question_id) => {
    if(question_id) {
      const newAnswers = _.filter(answers, (i) => { return i.question_id === Number(question_id) })
      const newSortedAnswers = _.sortBy(newAnswers, (a) => { return a.id })
      return newSortedAnswers
    } else {
      const newSortedAnswers = _.sortBy(answers, (a) => { return a.id })
      return newSortedAnswers
    }
  }, [])

  const handleRemoveAnswer = (answer_id) => {
    if(token) {
      let payload = {
        answer_id,
        user: token
      }
      removeAnswer(payload)
    }
  }
  

  if(!answers?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no answers found!  
      </div>
    )
  }

  const getIsCorrectValue = (value) => {
    if (value) return "true"
    return "false"
  }

  const getQuestionByAnswer = (question_id) => {
    const question = _.find(questions, { id: question_id })
    return question.name
  }


  return (
    <div className='dashboard_main w-full p-8'>
        <h1 className="mb-8 text-4xl font-bold">List of Answers</h1>

        <div className="flex gap-2">
          <CreateButton
            destination={"/dashboard/answer/create"} 
            styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
            label={"add answer"}
          />
          <div className="w-1/4">
          <DropDown 
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={`h-full w-full border-2 p-2 rounded-lg outline-none appearance-none`}
              ariaPlaceHolder="by questions"
              required={false}
              data={questions}
            />
          </div>
        </div>
    

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* {answers?.length && answers.map((answer, index) => { */}
          {answerCallback(answers, selected)?.length && answerCallback(answers, selected).map((answer, index) => {
            return (
              <div
              key={index}
              className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
                <h2 className="text-xl font-semibold">{answer.name}</h2>
                <div className="w-[4.5rem] h-[4.5rem]">
                  <Lottie animationData={book}/>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-600 text-base px-4 mt-4">
                  <span className="font-bold">Question</span> : {getQuestionByAnswer(answer.question_id)}
                </label>
                <label className="text-gray-600 text-base px-4">
                  <span className="font-bold">isCorrect</span> : {getIsCorrectValue(answer.is_correct)}
                </label>
                <label className="text-gray-600 text-base px-4">
                  <span className="font-bold">Date</span> : {UtcDateFormatter(answer.createdAt)}
                </label>
                <label className="text-gray-600 text-base px-4">
                  <span className="font-bold">Updated</span>  : {UtcDateFormatter(answer.updatedAt)}
                </label>
              </div>
              <div className="flex justify-center gap-4 py-2">    
                <motion.span
                  whileHover={{ scale: 1.5 }} 
                  transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                  className="font-bold text-green-700 cursor-pointer"
                >
                  <Link to={`/dashboard/answer/${encodeURL(answer)}`}>
                    <BiSolidEdit size={"1.2rem"}/>
                  </Link>
                </motion.span>
                {/* {IfhasTask(tasks, category.id) < 0 && */}
                <motion.span
                  onClick={() => handleRemoveAnswer(answer.id)} 
                  whileHover={{ scale: 1.5 }} 
                  transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                  className="font-bold text-red-400 cursor-pointer"
                >
                  <AiFillDelete size={"1.2rem"}/>
                </motion.span>
              {/* } */}
                </div>
            </div>
            )
          })}
      </div>  
    </div>
    
  )
}
