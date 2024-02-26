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

// const routeMaps = [
//   { path: "/", element: <HomeScreen /> },
//   { path: "/home", element: <HomeScreen /> },
// ];

export const RouteList = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/dashboard/classlevel" element={<ClassLevelScreen />} />
      <Route path="/dashboard/material" element={<MaterialScreen />} />
      <Route path="/dashboard/question" element={<QuestionScreen />} />
      <Route path="/dashboard/answer" element={<AnswerScreen />} />
      <Route path="/dashboard/result" element={<ResultScreen />} />
      <Route path="/dashboard/language" element={<LanguageScreen />} />
      <Route path="/dashboard/translation" element={<TranslationScreen />} />
    </Routes>
  );
};
