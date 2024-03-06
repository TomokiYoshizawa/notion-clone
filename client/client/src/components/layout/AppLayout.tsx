import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Box from "@mui/material/Box";

import authUtils from "../../utils/AuthUtils";

function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // chek if user has JWT
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div className="appLayout">
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
}

export default AppLayout;
