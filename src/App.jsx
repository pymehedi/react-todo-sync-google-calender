import React from "react";
import { Toaster } from "react-hot-toast";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import Register from "../ui/Register";
import Login from "../ui/Login";
import VerifyPasskey from "../ui/VerifyPasskey";
import VerifyOtp from "../ui/VerifyOtp";
import AppLayout from "../ui/AppLayout";
import Settings from "../ui/Settings";
import ToDo from "../ui/ToDo";
import Dashboard from "../ui/Dashboard";
import PageLayout from "../ui/PageLayout";

const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      // {
      //   path: "/",
      //   element: <div>Welcome to my to-dos app</div>,
      // },
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "/verify-2fa",
        element: <VerifyPasskey />,
      },
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "", // Matches "/app"
            element: <Navigate to="/app/settings" replace />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "todo",
            element: <ToDo />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
