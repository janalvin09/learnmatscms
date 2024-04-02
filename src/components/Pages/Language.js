import React, { useContext } from "react";
import { CreateButton } from "../Partial/CreateButton";
import { LanguageContext } from "src/contexts/LanguageContext";
import { UseLanguageStore } from "src/store/language";
import { UseTranslationStore } from "src/store/translation";
import { useUserStore } from "src/store/auth";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'
import { UtcDateFormatter, encodeURL, is_hasTranslation } from "src/utils/helpers";

export const Language = () => {
  const { languages } = UseLanguageStore((state) => ({ languages: state.languages }));
  const { translations } = UseTranslationStore((state) => ({ translations: state.translations }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeLanguage } = useContext(LanguageContext)

  const handleRemoveLanguage = (language_id) => {
    if(token) {
      let payload = {
        language_id,
        user: token
      }
      removeLanguage(payload)
    }
  }
  

  if(!languages?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no languages found!  
      </div>
    )
  }

  return (
    <div className='language_main w-full p-8'>
      <h1 className="mb-8 text-4xl font-bold">List of languages</h1>
        <CreateButton
          destination={"/dashboard/language/create"} 
          styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
          label={"add language"}
        />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {languages?.length && languages?.map((language, index) => {
          return (
            <div
            key={index}
            className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
          >
            <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
              <h2 className="text-xl font-semibold">{language.lang_code}</h2>
              <div className="w-[4.5rem] h-[4.5rem]">
                <Lottie animationData={book}/>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-600 text-base px-4 mt-4">
                <span className="font-bold">Language</span> : {language.name}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Date</span> : {UtcDateFormatter(language.createdAt)}
              </label>
              <label className="text-gray-600 text-base px-4">
                <span className="font-bold">Updated</span>  : {UtcDateFormatter(language.updatedAt)}
              </label>
            </div>
            <div className="flex justify-center gap-4 py-2">    
              <motion.span
                whileHover={{ scale: 1.5 }} 
                transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
                className="font-bold text-green-700 cursor-pointer"
              >
                <Link to={`/dashboard/language/${encodeURL(language)}`}>
                  <BiSolidEdit size={"1.2rem"}/>
                </Link>
              </motion.span>
              {is_hasTranslation(translations, language.id) < 0 &&
              <motion.span
                onClick={() => handleRemoveLanguage(language.id)} 
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
