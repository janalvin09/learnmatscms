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


// CHILD SCREENS0
import { CreateClassLevelScreen } from "src/components/Screens/crud/create/CreateClassLevelScreen";
import { CreateAnswerScreen } from "src/components/Screens/crud/create/CreateAnswerScreen";
import { CreateLanguageScreen } from "src/components/Screens/crud/create/CreateLanguageScreen";
import { CreateMaterialScreen } from "src/components/Screens/crud/create/CreateMaterialScreen";
import { CreateQuestionScreen } from "src/components/Screens/crud/create/CreateQuestionScreen";
import { CreateResultScreen } from "src/components/Screens/crud/create/CreateResultScreen";
import { CreateTranslationScreen } from "src/components/Screens/crud/create/CreateTranslationScreen";

import { UpdateClassLevelScreen } from "src/components/Screens/crud/update/UpdateClassLevelScreen";
import { UpdateAnswerScreen } from "src/components/Screens/crud/update/UpdateAnswerScreen";
import { UpdateLanguageScreen } from "src/components/Screens/crud/update/UpdateLanguageScreen";
import { UpdateMaterialScreen } from "src/components/Screens/crud/update/UpdateMaterialScreen";
import { UpdateQuestionScreen } from "src/components/Screens/crud/update/UpdateQuestionScreen";
import { UpdateResultScreen } from "src/components/Screens/crud/update/UpdateResultScreen";
import { UpdateTranslationScreen } from "src/components/Screens/crud/update/UpdateTranslationScreen";

//  ROUTES PRIVELEGE
import PrivateRoutes from "./PrivateRoute";
import LoginRoutes from "./LoginRoute";

export const routeMaps = [
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
  {
    path: "/dashboard/classlevel/create",
    element: <CreateClassLevelScreen />,
    name: "CreateClassLevel",
  },
  {
    path: "/dashboard/answer/create",
    element: <CreateAnswerScreen />,
    name: "CreateAnswer",
  },
  {
    path: "/dashboard/language/create",
    element: <CreateLanguageScreen />,
    name: "CreateLanguage",
  },
  {
    path: "/dashboard/material/create",
    element: <CreateMaterialScreen />,
    name: "CreateMaterial",
  },
  {
    path: "/dashboard/question/create",
    element: <CreateQuestionScreen />,
    name: "CreateQuestion",
  },
  {
    path: "/dashboard/result/create",
    element: <CreateResultScreen />,
    name: "CreateResult",
  },
  {
    path: "/dashboard/translation/create",
    element: <CreateTranslationScreen />,
    name: "CreateTranslation",
  },

  {
    path: "/dashboard/classlevel/update",
    element: <UpdateClassLevelScreen />,
    name: "UpdateClassLevel",
  },
  {
    path: "/dashboard/answer/update",
    element: <UpdateAnswerScreen />,
    name: "UpdateAnswer",
  },
  {
    path: "/dashboard/language/update",
    element: <UpdateLanguageScreen />,
    name: "UpdateLanguage",
  },
  {
    path: "/dashboard/material/update",
    element: <UpdateMaterialScreen />,
    name: "UpdateMaterial",
  },
  {
    path: "/dashboard/question/update",
    element: <UpdateQuestionScreen />,
    name: "UpdateQuestion",
  },
  {
    path: "/dashboard/result/update",
    element: <UpdateResultScreen />,
    name: "UpdateResult",
  },
  {
    path: "/dashboard/translation/update",
    element: <UpdateTranslationScreen />,
    name: "UpdateTranslation",
  }
];


export const RouteList = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>

      <Route element={<PrivateRoutes />}>
        {routeMaps.map((routeMap) => (
          <Route
            path={routeMap.path}
            element={routeMap.element}
            key={routeMap.path}
          />
        ))}
      </Route>

      <Route element={<LoginRoutes />}>
        <Route path="/login" element={<LoginScreen />}/>
        <Route path="/" element={<LoginScreen />}/>
      </Route>

    </Routes>
  );
};
