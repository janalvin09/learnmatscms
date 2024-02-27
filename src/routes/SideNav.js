import Lottie from "lottie-react";
import profile from "src/assets/profile.json";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { routeMaps } from "./RouteList";
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'
import { IoMdFolder } from 'react-icons/io'

export const SideNav = () => {
  const lottie = {
    width: 100,
    height: 100,
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    toast("Logout Success!", { type: "success" });
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-auto px-4 text-sm text-center shadow-2xl sidenav_main xs:hidden sm:flex md:flex lg:flex xl:flex">
      <ul className="flex flex-col gap-4">
        <li style={lottie}>
          <Lottie animationData={profile} />
        </li>
        {routeMaps.map((routeMap) =>
          routeMap.name !== "Login" && (
              <Link
                to={routeMap.path}
                className="w-full flex gap-2 cursor-pointer"
                target="_self"
                key={routeMap.name}
              >
              {routeMap.name === 'Dashboard' &&
                <FaTachometerAlt 
                  width={5} 
                  height={5}
                  className="text-xl text-gray-500"
                />
              }
              {routeMap.name !== 'Dashboard' &&
                <IoMdFolder 
                  width={5} 
                  height={5}
                  className="text-xl text-gray-500"
                />
              }
                {routeMap.name}
              </Link>
          )
        )}

        <li
          onClick={() => handleLogout()}
          className="flex gap-2 cursor-pointer"
        >
          <FaSignOutAlt 
            width={5}
            height={5}
            className="text-xl text-gray-500"
          />
          <span>Sign out</span>
        </li>
      </ul>
    </div>
  );
};
