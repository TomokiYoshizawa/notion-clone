import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import authApi from "./api/authApi.js";
import React from "react";
import { useState } from "react";

function Register() {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmPasswordErrText("");

    //get the form data
    const data = new FormData(e.target);
    const username = (data.get("username") as string).trim();
    const password = (data.get("password") as string).trim();
    const confirmPassword = (data.get("confirmPassword") as string).trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error = false;

    if (username === "") {
      error = true;
      setUsernameErrText("Username is required");
    }
    if (password === "") {
      error = true;
      setPasswordErrText("Password is required");
    }
    if (confirmPassword === "") {
      error = true;
      setConfirmPasswordErrText("Confirm Password is required");
    }
    if (password !== confirmPassword) {
      error = true;
      setUsernameErrText("Passwords do not match");
    }
    if (error) {
      return;
    }

    //registering API
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", res.data.token);
      console.log("new user registered");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="name"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ""}
        />
        <TextField
          fullWidth
          id="password"
          label="password"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ""}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="confirmPassword"
          margin="normal"
          name="confirmPassword"
          type="password"
          required
          helperText={confirmPasswordErrText}
          error={confirmPasswordErrText !== ""}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        Already have an account? Login
      </Button>
    </div>
  );
}

export default Register;
