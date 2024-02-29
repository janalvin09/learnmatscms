import { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { LazyImage } from "../Lazy/Lazy";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import books from "src/assets/books.webp";
import { AuthContext } from "src/contexts/AuthContext";


export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const { login, loginLoading } = useContext(AuthContext)

  const onSubmit = (data) => {
    login(data)
  };

  const handlePasswordVisibility = (isVisible) => {
    setisPasswordVisible(!isVisible);
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 login_main">
      <section className="flex flex-col items-center justify-center px-6 py-8 mx-auto rounded-lg shadow-lg bg-gray-50 lg:py-0">
        <LazyImage src={books} alt={"book image"} height={200} width={200} />
        <h1 className="mt-5">Login as administrator</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full p-6 space-y-4 form_container md:space-y-6 sm:p-8"
        >
          <div className="space-y-4 form md:space-y-6">
            <div className="email_textfield">
              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value}
                    onChange={onChange}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="enter your email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                )}
                name="email"
              />
              {errors.email && (
                <p className="text-sm text-red-400 indent-2">email invalid*</p>
              )}
            </div>
            <div className="relative password_textfield">
              {isPasswordVisible && (
                <FaEyeSlash
                  width={50}
                  height={50}
                  className="absolute z-50 text-xl text-gray-500 cursor-pointer top-3 right-6 fa fa-eye"
                  onClick={() => handlePasswordVisibility(isPasswordVisible)}
                />
              )}
              {!isPasswordVisible && (
                <FaEye
                  width={50}
                  height={50}
                  className="absolute z-50 text-xl text-gray-500 cursor-pointer top-3 right-6 fa fa-eye"
                  onClick={() => handlePasswordVisibility(isPasswordVisible)}
                />
              )}

              <Controller
                control={control}
                rules={{
                  required: true,
                  pattern: /[\S\s]+[\S]+/,
                }}
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value}
                    onChange={onChange}
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                )}
                name="password"
              />
              {errors.password && (
                <p className="text-sm text-red-400 indent-2">
                  password invalid*
                </p>
              )}
            </div>
            <div className="min-w-[20rem]">
              <button
                disabled={loginLoading}
                type="submit"
                className="w-full text-gray-900 bg-white flex justify-center items-center gap-4 cursor-pointer hover:bg-gray-300 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4"
              >
                <BiLogIn width={50} height={50} />
                {loginLoading ? "Please wait..." : "Login" }
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};