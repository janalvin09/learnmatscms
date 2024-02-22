import { Routes, Route, useLocation } from "react-router-dom";

// SCREEN
import { HomeScreen } from "../components/Screens/HomeScreen";
import { useEffect } from "react";

const routeMaps = [
  { path: "/", element: <HomeScreen /> },
  { path: "/home", element: <HomeScreen /> },
];

export const RouteList = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Routes location={location} key={location.pathname}>
      {routeMaps.map((routeMap, index) => (
        <Route path={routeMap.path} element={routeMap.element} />
      ))}
    </Routes>
  );
};
