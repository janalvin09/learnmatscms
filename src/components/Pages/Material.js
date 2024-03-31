import React, { useContext, useState, useCallback } from "react";
import { CreateButton } from "../Partial/CreateButton";
import { MaterialContext } from "src/contexts/MaterialContext";
import { UseMaterialStore } from "src/store/material";
import { UseClassLevelStore } from "src/store/classlevel";
import { UseQuestionStore } from "src/store/question";
import { UseCategoryStore } from "src/store/category";
import { useUserStore } from "src/store/auth";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'
import { UtcDateFormatter, encodeURL, is_hasQuestion } from "src/utils/helpers";
import { DropDown } from "../Partial/Select";
import { lineTextFormatter } from "src/utils/helpers";
import _ from "lodash";

export const Material = () => {

  const { materials } = UseMaterialStore((state) => ({ materials: state.materials }));
  const { classlevels } = UseClassLevelStore((state) => ({ classlevels: state.classlevels }));
  const { questions } = UseQuestionStore((state) => ({ questions: state.questions }));
  const { categories } = UseCategoryStore((state) => ({ categories: state.categories }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeMaterial } = useContext(MaterialContext)
  const [ selected, setSelected ] = useState()

  const materialCallback = useCallback((materials, classlevel_id) => {
    if(classlevel_id) {
      const newMaterials = _.filter(materials, (i) => { return i.classlevel_id === Number(classlevel_id) })
      return newMaterials
    } else {
      return materials
    }
  }, [])

  const handleRemoveMaterial = (material_id) => {
    if(token) {
      let payload = {
        material_id,
        user: token
      }
      removeMaterial(payload)
    }
  }
  

  if(!materials?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no material found!  
      </div>
    )
  }


  const getClassLevelByMaterial = (classlevel_id) => {
    const classlevel = _.find(classlevels, { id: classlevel_id })
    return lineTextFormatter(12, classlevel.name)
  }
  const getCategoryByMaterial = (category_id) => {
    const category = _.find(categories, { id: category_id })
    return lineTextFormatter(12, category.name)
  }
  
  return (
    <div className='material_main w-full p-8'>
      <h1 className="mb-8 text-4xl font-bold">List of Materials</h1>

      <div className="flex gap-2">
        <CreateButton
          destination={"/dashboard/material/create"} 
          styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
          label={"add material"}
        />
        <div className="w-1/4">
        <DropDown 
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className={`h-full w-full border-2 p-2 rounded-lg outline-none appearance-none`}
            ariaPlaceHolder="by class level"
            required={false}
            data={classlevels}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!materialCallback(materials, selected)?.length &&
        <div>no material found!</div>
      }
      {materialCallback(materials, selected)?.length > 0 && materialCallback(materials, selected)?.map((material, index) => {
        return (
          <div
          key={index}
          className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{lineTextFormatter(12, material.name)}</h2>
            <div className="w-[4.5rem] h-[4.5rem]">
              <Lottie animationData={book}/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-base px-4 mt-4">
              <span className="font-bold">Classlevel</span> : {getClassLevelByMaterial(material.classlevel_id)}
            </label>
            <label className="text-gray-600 text-base px-4">
              <span className="font-bold">Category</span> : {getCategoryByMaterial(material.category_id)}
            </label>
            <label className="text-gray-600 text-base px-4">
              <span className="font-bold">Date</span> : {UtcDateFormatter(material.createdAt)}
            </label>
            <label className="text-gray-600 text-base px-4">
              <span className="font-bold">Updated</span>  : {UtcDateFormatter(material.updatedAt)}
            </label>
          </div>
          <div className="flex justify-center gap-4 py-2">    
            <motion.span
              whileHover={{ scale: 1.5 }} 
              transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
              className="font-bold text-green-700 cursor-pointer"
            >
              <Link to={`/dashboard/material/${encodeURL(material)}`}>
                <BiSolidEdit size={"1.2rem"}/>
              </Link>
            </motion.span>
            {is_hasQuestion(questions, material.id) < 0 &&
            <motion.span
              onClick={() => handleRemoveMaterial(material.id)} 
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
