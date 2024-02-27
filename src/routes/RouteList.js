import { Routes, Route, useLocation } from "react-router-dom";

// SCREEN
import { LoginScreen } from "src/components/Screens/LoginScreen";
import { DashboardScreen } from "src/components/Screens/DashboardScreen";
import { ClassLevelScreen } from "src/components/Screens/ClassLevelScreen";
import { MaterialScreen } from "src/components/Screens/MaterialScreen";
import { QuestionScreen } from "src/components/Screens/QuestionScreen";
import { AnswerScreen } from "src/components/Screens/AnswerScreen";
import { ResultScreen } from "src/components/Screens/ResultScreen";
import { LanguageScreen } from "src/components/Screens/LanguageScreen";
import { TranslationScreen } from "src/components/Screens/TranslationScreen";

import { useEffect } from "react";

export const routeMaps = [
  {
    path: "/",
    element: <LoginScreen />,
    name: "Login",
  },
  {
    path: "/login",
    element: <LoginScreen />,
    name: "Login",
  },
  {
    path: "/dashboard",
    element: <DashboardScreen />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/classlevel",
    element: <ClassLevelScreen />,
    name: "Class Level",
  },
  {
    path: "/dashboard/material",
    element: <MaterialScreen />,
    name: "Material",
  },
  {
    path: "/dashboard/question",
    element: <QuestionScreen />,
    name: "Question",
  },
  {
    path: "/dashboard/answer",
    element: <AnswerScreen />,
    name: "Answer",
  },
  {
    path: "/dashboard/result",
    element: <ResultScreen />,
    name: "Result",
  },
  {
    path: "/dashboard/language",
    element: <LanguageScreen />,
    name: "Language",
  },
  {
    path: "/dashboard/translation",
    element: <TranslationScreen />,
    name: "Translation",
  },
];

export const RouteList = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Routes location={location} key={location.pathname}>
      {routeMaps.map((routeMap) => (
        <Route
          path={routeMap.path}
          element={routeMap.element}
          key={routeMap.path}
        />
      ))}
    </Routes>
  );
};
