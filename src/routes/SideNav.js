import { useContext } from "react";
import Lottie from "lottie-react";
import profile from "src/assets/profile.json";
import { Link } from "react-router-dom";
import { routeMaps } from "./RouteList";
import { FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { IoMdFolder } from "react-icons/io";
import { AuthContext } from "src/contexts/AuthContext";

export const SideNav = () => {
  const lottie = {
    width: 100,
    height: 100,
  };
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  };

  const ignoreOtherRoutes = (routeName) => {
    const countedRoutes = [
      "Dashboard",
      "Class Level",
      "Material",
      "Question",
      "Answer",
      "Result",
      "Language",
      "Translation",
    ];

    return countedRoutes.find((countedRoute) => countedRoute === routeName);
  };

  return (
    <div className="flex flex-col w-auto px-4 text-sm text-center shadow-2xl sidenav_main xs:hidden sm:flex md:flex lg:flex xl:flex">
      <ul className="flex flex-col gap-4">
        <li style={lottie}>
          <Lottie animationData={profile} />
        </li>
        {routeMaps.map(
          (routeMap) =>
            ignoreOtherRoutes(routeMap.name) && (
              <Link
                to={routeMap.path}
                className="flex w-full gap-2 cursor-pointer"
                target="_self"
                key={routeMap.name}
              >
                {routeMap.name === "Dashboard" && (
                  <FaTachometerAlt
                    width={5}
                    height={5}
                    className="text-xl text-gray-500"
                  />
                )}
                {routeMap.name !== "Dashboard" && (
                  <IoMdFolder
                    width={5}
                    height={5}
                    className="text-xl text-gray-500"
                  />
                )}
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