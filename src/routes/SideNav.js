import Lottie from "lottie-react";
import profile from "src/assets/profile.json";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { routeMaps } from "./RouteList";

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
          routeMap.name !== "Login" ? (
            <Link
              to={routeMap.path}
              className="flex gap-2 cursor-pointer"
              target="_self"
              key={routeMap.name}
            >
              {routeMap.name}
            </Link>
          ) : null
        )}

        <li
          onClick={() => handleLogout()}
          className="flex gap-2 cursor-pointer"
        >
          <span>Sign out</span>
        </li>
      </ul>
    </div>
  );
};
