import React from 'react'
import { useParams } from 'react-router-dom'
import { UseResultStore } from 'src/store/result';
import { UseMaterialStore } from 'src/store/material';
import { UseClassLevelStore } from 'src/store/classlevel';
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'
import { UtcDateFormatter, decodeURL } from "src/utils/helpers";
import _ from "lodash";

export const ViewResult = () => {
  const params = useParams()
  const { result } = params
  const { users } = UseResultStore((state) => ({ users: state.users }));
  const { materials } = UseMaterialStore((state) => ({ materials: state.materials }));
  const { classlevels } = UseClassLevelStore((state) => ({ classlevels: state.classlevels }));

  const getUserByResult = (user_id) => {
    const user = _.find(users, { id: user_id })
    return user.name
  }

  const getMaterialByResult = (material_id) => {
    const material = _.find(materials, { id: material_id })
    return material.name
  }
  
  const getClassLevelByResult = (classlevel_id) => {
    const classlevel = _.find(classlevels, { id: classlevel_id })
    return classlevel.name
  }
  

  return (
    <div className='view-result-main min-h-screen w-full flex justify-center items-center'>
      <div
        className="w-1/2 overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 pb-5"
      >
        <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{getUserByResult(decodeURL(result).user_id)}'s Record</h2>
          <div className="w-[4.5rem] h-[4.5rem]">
            <Lottie animationData={book}/>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-600 text-base px-4 mt-4">
            <span className="font-bold">Score (%)</span> : {`${decodeURL(result).score_by_percentage} %`}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Material</span> : {getMaterialByResult(decodeURL(result).material_id)}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Classlevel</span> : {getClassLevelByResult(decodeURL(result).classlevel_id)}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Total Correct</span> : {decodeURL(result).total_correct_answer}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Total Incorrect</span> : {decodeURL(result).total_incorrect_answer}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Number of Questions</span> : {decodeURL(result).number_of_question}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Date</span> : {UtcDateFormatter(decodeURL(result).createdAt)}
          </label>
          <label className="text-gray-600 text-base px-4">
            <span className="font-bold">Updated</span>  : {UtcDateFormatter(decodeURL(result).updatedAt)}
          </label>
        </div>
      </div>
    </div>
  )
}
