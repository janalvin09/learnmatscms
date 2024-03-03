import React, { useContext, useState, useCallback } from "react";
import { CreateButton } from "../Partial/CreateButton";
import { TranslationContext } from "src/contexts/TranslationContext";
import { UseTranslationStore } from "src/store/translation";
import { UseLanguageStore } from "src/store/language";
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



export const Translation = () => {

  const { translations } = UseTranslationStore((state) => ({ translations: state.translations }));
  const { languages } = UseLanguageStore((state) => ({ languages: state.languages }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeTranslation } = useContext(TranslationContext)
  const [ selected, setSelected ] = useState()


  const translationCallback = useCallback((translations, language_id) => {
    if(language_id) {
      const newTranslations = _.filter(translations, (i) => { return i.language_id === Number(language_id) })
      const newSortedTranslations = _.sortBy(newTranslations, (a) => { return a.id })
      return newSortedTranslations
    } else {
      const newSortedTranslations = _.sortBy(translations, (a) => { return a.id })
      return newSortedTranslations
    }
  }, [])

  const handleRemoveTranslation = (translation_id) => {
    if(token) {
      let payload = {
        translation_id,
        user: token
      }
      removeTranslation(payload)
    }
  }
  

  if(!translations?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no translations found!  
      </div>
    )
  }

  const getLanguageByTranslation = (language_id) => {
    const language = _.find(languages, { id: language_id })
    return language.name
  }


  return (
    <div className='translation_main w-full p-8'>
      <h1 className="mb-8 text-4xl font-bold">List of translation</h1>
      
        <div className="flex gap-2">
          <CreateButton
            destination={"/dashboard/translation/create"} 
            styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
            label={"add translation"}
          />
          <div className="w-1/4">
            <DropDown 
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className={`h-full w-full border-2 p-2 rounded-lg outline-none appearance-none`}
                ariaPlaceHolder="by languages"
                required={false}
                data={languages}
              />
          </div>
        </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {translationCallback(translations, selected)?.length && translationCallback(translations, selected).map((translation, index) => {
          return (
            <div
            key={index}
            className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{translation.word}</h2>
              <div className="w-[4.5rem] h-[4.5rem]">
                <Lottie animationData={book}/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 text-base px-4 mt-4">
                <span className="font-bold">Language</span> : {getLanguageByTranslation(translation.language_id)}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Translation</span> : {translation.translation}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Date</span> : {UtcDateFormatter(translation.createdAt)}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Updated</span>  : {UtcDateFormatter(translation.updatedAt)}
              </label>
            </div>
            <div className="flex justify-center gap-4 py-2">    
              <motion.span
                whileHover={{ scale: 1.5 }} 
                transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                className="font-bold text-green-700 cursor-pointer"
              >
                <Link to={`/dashboard/translation/${encodeURL(translation)}`}>
                  <BiSolidEdit size={"1.2rem"}/>
                </Link>
              </motion.span>
              {/* {is_hasQuestion(questions, material.id) < 0 && */}
              <motion.span
                onClick={() => handleRemoveTranslation(translation.id)} 
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
