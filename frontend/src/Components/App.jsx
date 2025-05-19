import React, { createContext, useReducer } from "react";
import Register from "./Screens/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Screens/Login";
import Voice2Text from "./Editor/Voice2Text";
import Image2Text from "./Editor/Image2Text";
import Python from "./Editor/Python";
import Html from "./Editor/Html";
import Dart from "./Editor/Dart";
import JavaScript from "./Editor/Javascript";
import Java from "./Editor/Java";
import Errorpage from "./Screens/Errorpage";
import Homepage from "./Screens/Homepage";
import Header from "./Header";
import Logout from "./Screens/Logout";
import { Toaster } from "react-hot-toast";

import { initialState, reducer } from "../reducer/UseReducer";
import C from "./Editor/c";

import { useEffect } from "react";
import ProtectedRoute from "./protectedRoutes";
import ForgotPassword from "./Screens/forgetPassword";
import ResetPassword from "./Screens/ResetPassword";

export const UsedContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "USER", payload: true });
    } else {
      dispatch({ type: "USER", payload: false });
    }
  }, []);
  return (
    <UsedContext.Provider value={{ state, dispatch }}>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        />
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/editor/python"
            element={
              <ProtectedRoute>
                <Python />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/javascript"
            element={
              <ProtectedRoute>
                <JavaScript />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/html"
            element={
              <ProtectedRoute>
                <Html />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/css"
            element={
              <ProtectedRoute>
                <Html />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/dart"
            element={
              <ProtectedRoute>
                <Dart />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/java"
            element={
              <ProtectedRoute>
                <Java />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/c"
            element={
              <ProtectedRoute>
                <C />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/voice2text"
            element={
              <ProtectedRoute>
                <Voice2Text />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/image2text"
            element={
              <ProtectedRoute>
                <Image2Text />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </UsedContext.Provider>
  );
}

export default App;
