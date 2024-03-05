import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      auth <Outlet />
    </div>
  );
}

export default AuthLayout;
