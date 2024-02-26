import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LazyImage } from '../Lazy/Lazy'
import { FaEye, FaEyeSlash  } from 'react-icons/fa'
import { BiLogIn } from 'react-icons/bi'
import { toast } from "react-toastify";
import books from 'src/assets/books.webp'

import { useNavigate } from 'react-router-dom'


export const Login = () => {

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  }) 
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => { // ES6

    if(data.email === process.env.REACT_APP_ADMIN_USERNAME && data.password === process.env.REACT_APP_ADMIN_PASSWORD) {
        toast("Login Success!", { type: "success" })
        navigate('/dashboard')
    } else {
      toast("Invalid Credentials!", { type: "warning" })
    }

  }

  const handlePasswordVisibility = (isVisible) => {
    setisPasswordVisible(!isVisible);
  };

  return (
    <div className="login_main flex min-h-screen flex-col items-center justify-center mx-4">
      <section className="bg-gray-50 rounded-lg shadow-lg flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <LazyImage 
          src={books}
          alt={"book image"}
          height={200}
          width={200}
        />
        <h1 className="mt-5">Login as administrator</h1>
        <div className="form_container w-full p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="form space-y-4 md:space-y-6">
            <div className="email_textfield">
              <Controller 
                control={control}
                rules={{
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/
                }}
                render={( { field: { onChange, value } }) => (
                  <input 
                  value={value}
                  onChange={onChange}
                  type="email" 
                  name="email" id="email" 
                  placeholder="enter your email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                />
                )}
                name="email"
              />
                { errors.email && <p className="text-red-400 indent-2 text-sm">email invalid*</p> }
            </div>
            <div className="password_textfield relative">
                {isPasswordVisible &&
                  <FaEyeSlash width={50} height={50}
                    className="absolute text-xl top-3 right-6 text-gray-500 z-50 cursor-pointer fa fa-eye"
                    onClick={() => handlePasswordVisibility(isPasswordVisible)}
                  /> 
                }
                {!isPasswordVisible &&
                  <FaEye width={50} height={50}
                    className="absolute text-xl top-3 right-6 text-gray-500 z-50 cursor-pointer fa fa-eye"
                    onClick={() => handlePasswordVisibility(isPasswordVisible)}
                  /> 
                }
          
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    pattern : /[\S\s]+[\S]+/
                  }}
                  render={({ field: { onChange, value } }) => (
                    <input
                      value={value}
                      onChange={onChange} 
                      type={isPasswordVisible ? "text" : "password" }
                      name="password" id="password" 
                      placeholder="••••••••" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    />
                    
                  )}
                  name="password"
                />
                { errors.password && <p className="text-red-400 indent-2 text-sm">password invalid*</p> }
            </div>   
            <div className="min-w-[20rem]">
                <button 
                  onClick={handleSubmit((data) => onSubmit(data))}
                  type="button" 
                  className="w-full text-gray-900 bg-white flex justify-center items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
                >
                  <BiLogIn width={50} height={50} />
                  Login
                </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}