import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function AppLayout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(
    function () {
      async function checkAuth() {
        try {
          const response = await axios.get(
            "https://todo-sync-google-calender.onrender.com/isLoggedIn",
            {
              withCredentials: true,
            }
          );
          if (response.data.status == "success") {
            console.log(response.data);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            navigate("/login");
          }
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          navigate("/login");
        }
      }

      checkAuth();
    },
    [isAuthenticated, navigate]
  );
  return (
    <>
      {isAuthenticated ? (
        <div className="h-screen grid grid-rows-[auto_1fr]">
          <Header />

          <div className="overflow-scroll">
            <Outlet />
          </div>
        </div>
      ) : (
        <div>error</div>
      )}
    </>
  );
}

export default AppLayout;
