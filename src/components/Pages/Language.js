import React from 'react'
import { CreateButton } from "../Partial/CreateButton";

export const Language = () => {
  return (
    <div className='language_main w-full p-8'>
      <h1 className="mb-8 text-4xl font-bold">List of languages</h1>
        <CreateButton
          destination={"/dashboard/language/create"} 
          styles={"create-btn-main bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"}
          label={"add language"}
        />
    </div>
    
  )
}
