import React, { useContext } from "react";
import { CreateButton } from "../Partial/CreateButton";
import { ClasslevelContext } from "src/contexts/ClassLevelContext";
import { UseClassLevelStore } from "src/store/classlevel";
import { UseMaterialStore } from "src/store/material";
import { useUserStore } from "src/store/auth";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BiSolidEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { lineTextFormatter } from "src/utils/helpers";
import Lottie from 'lottie-react'
import book from 'src/assets/book.json'

import { UtcDateFormatter, encodeURL, is_hasMaterial } from "src/utils/helpers";

export const ClassLevel = () => {
  const { classlevels } = UseClassLevelStore((state) => ({ classlevels: state.classlevels }));
  const { materials } = UseMaterialStore((state) => ({ materials: state.materials }));
  const { token } = useUserStore((state) => ({ token: state.token }));
  const { removeClassLevel } = useContext(ClasslevelContext)

  const handleRemoveClasslevel = (classlevel_id) => {
    if(token) {
      let payload = {
        classlevel_id,
        user: token
      }
      removeClassLevel(payload)
    }
  }
  

  if(!classlevels?.length) {
    return (
      <div className="categories_main w-ull p-20">
        no classlevel found!  
      </div>
    )
  }


  return (
    <div className="p-8 classlevel_main">
      <h1 className="mb-8 text-4xl font-bold">List of Class Levels</h1>

      <CreateButton
        destination={"/dashboard/classlevel/create"} 
        styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
        label={"add classlevel"}
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {classlevels?.length && classlevels.map((classlevel, index) => {
        return (
          <div
          key={index}
          className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          <div className="p-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{lineTextFormatter(12, classlevel.name)}</h2>
            <div className="w-[4.5rem] h-[4.5rem]">
              <Lottie animationData={book}/>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-600 text-base px-4 mt-4">
              <span className="font-bold">Date</span> : {UtcDateFormatter(classlevel.createdAt)}
            </label>
            <label className="text-gray-600 text-base px-4">
              <span className="font-bold">Updated</span>  : {UtcDateFormatter(classlevel.updatedAt)}
            </label>
          </div>
          <div className="flex justify-center gap-4 py-2">    
            <motion.span
              whileHover={{ scale: 1.5 }} 
              transition={{ type: "spring", stiffness: 400, ease: "easeInOut" }}
              className="font-bold text-green-700 cursor-pointer"
            >
              <Link to={`/dashboard/classlevel/${encodeURL(classlevel)}`}>
                <BiSolidEdit size={"1.2rem"}/>
              </Link>
            </motion.span>
            {is_hasMaterial(materials, classlevel.id) < 0 &&
            <motion.span
              onClick={() => handleRemoveClasslevel(classlevel.id)} 
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
  );
};