import React from "react";
import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default PageLayout;
