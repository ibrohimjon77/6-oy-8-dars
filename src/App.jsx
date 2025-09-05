import React, { useEffect } from "react";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";

import {action as RegisterAction } from './pages/Register'
import { onAuthStateChanged } from "firebase/auth";
import { isAuthReady, login } from "./app/feature/userSlice";
import { auth } from "./firebase/config";
import CreateTask from "./pages/CreateTask";

function App() {
  const dispatch = useDispatch()
  const { user,authReady } = useSelector((store) => store.user);
  const routes = createBrowserRouter([
  
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action:RegisterAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action:RegisterAction,
    },

  
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:'/create',
          element:<CreateTask/>
        }
      ],
    },
  ]);

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
    if(user?.displayName){
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    })
},[])
  return (
    <>
    {  authReady &&    <RouterProvider router={routes} />};
    </>
  );
} 

export default App;
