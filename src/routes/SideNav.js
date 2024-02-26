import Lottie from 'lottie-react'
import profile from 'src/assets/profile.json'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

export const SideNav = () => {
  
  const lottie = {
    width: 100,
    height: 100 
  }
  const navigate = useNavigate();

  const handleLogout = () => {
    toast("Logout Success!", { type: "success" })
    navigate('/login')
  }

  return (
    <div className="sidenav_main w-auto px-4 xs:hidden sm:flex md:flex lg:flex xl:flex flex flex-col text-center text-sm shadow-2xl">
      <ul className="flex flex-col gap-4">
        <li style={lottie}>
          <Lottie animationData={profile}/>
        </li>
        <Link to="/dashboard" className="flex gap-2 cursor-pointer" target="_self">
          {/* <span><AiOutlineHome /></span> */}
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/classlevel" className="flex gap-2 cursor-pointer">
            <span>Classlevel </span>
        </Link>
        <Link to="/dashboard/material" className="flex gap-2 cursor-pointer">
            <span>Material</span>
        </Link>  
        <Link to="/dashboard/question" className="flex gap-2 cursor-pointer" target="_self">
          <span>Question</span>
        </Link>
        <Link to="/dashboard/answer" className="flex gap-2 cursor-pointer" target="_self">
          <span>Answer</span>
        </Link>
        <Link to="/dashboard/result" className="flex gap-2 cursor-pointer" target="_self">
          <span>Result</span>
        </Link>
        <Link to="/dashboard/language" className="flex gap-2 cursor-pointer" target="_self">
          <span>Language</span>
        </Link>
        <Link to="/dashboard/translation" className="flex gap-2 cursor-pointer" target="_self">
          <span>Translation</span>
        </Link>
        <li onClick={() => handleLogout()} className="flex gap-2 cursor-pointer">
          <span>
            Sign out
          </span>
        </li>
      </ul>
    </div>
  )
}