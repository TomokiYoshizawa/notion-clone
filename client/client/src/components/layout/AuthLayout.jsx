import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import notionLogo from "../../assets/images/notion-logo.png";

function AuthLayout() {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src={notionLogo}
            alt="Notion Logo"
            style={{ width: 100, height: 100, marginBottom: 3 }}
          />
          Notion Clone develop
        </Box>
        <Outlet />
      </Container>
    </div>
  );
}

export default AuthLayout;
