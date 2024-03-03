import React, { useState, useCallback } from "react";
import { UseResultStore } from "src/store/result";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'
import { UtcDateFormatter, encodeURL } from "src/utils/helpers";
import { DropDown } from "../Partial/Select";
import _ from "lodash";


export const Result = () => {
  const { results, users } = UseResultStore((state) => ({ results: state.results, users: state.users }));
  const [ selected, setSelected ] = useState()


  const resultCallback = useCallback((results, user_id) => {
    if(user_id) {
      const newResults = _.filter(results, (i) => { return i.user_id === Number(user_id) })
      const newSortedResults = _.sortBy(newResults, (a) => { return a.id })
      return newSortedResults
    } else {
      const newSortedResults = _.sortBy(results, (a) => { return a.id })
      return newSortedResults
    }
  }, [])


  if(!results?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no results found!  
      </div>
    )
  }

  
  const getUserByResult = (user_id) => {
    const user = _.find(users, { id: user_id })
    return user.name
  }



  return (
    <div className='result_main w-full p-8'>
      <h1 className="mb-8 text-4xl font-bold">List of Results</h1>
        <div className="w-1/4 pb-4">
          <DropDown 
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className={`h-full w-full border-2 p-2 rounded-lg outline-none appearance-none`}
              ariaPlaceHolder="by students"
              required={false}
              data={users}
            />
          </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!resultCallback(results, selected)?.length &&
          <div>no result found for this student</div>
        }
        {resultCallback(results, selected)?.length > 0 && resultCallback(results, selected).map((result, index) => {
          return (
          <div
            key={index}
            className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{getUserByResult(result.user_id)}</h2>
              <div className="w-[4.5rem] h-[4.5rem]">
                <Lottie animationData={book}/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 text-base px-4 mt-4">
                <span className="font-bold">Score (%)</span> : {`${result.score_by_percentage} %`}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Date</span> : {UtcDateFormatter(result.createdAt)}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Updated</span>  : {UtcDateFormatter(result.updatedAt)}
              </label>
            </div>
            <div className="flex justify-center gap-4 py-2">    
                <motion.span 
                  whileHover={{ scale: 1.5 }} 
                  transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                  className="font-bold text-blue-500 cursor-pointer"
                >
                  <Link to={`/dashboard/result/${encodeURL(result)}`}>
                    <FaEye size={"1.2rem"}/>
                  </Link>
                </motion.span>
              </div>
          </div>
          )
        })}
      </div>
    </div>
    
  )
}
