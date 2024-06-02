import { TextField, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabaseClient } from "../Services/supabaseClient";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
      setErrorMessage(error.message);
    } else {
      console.log("User signed in successfully");
      navigate("/Dashboard");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        textAlign={"center"}
        maxWidth={300}
        sx={{ outline: 1, p: 5, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Sign in!
        </Typography>
        <TextField
          variant="outlined"
          label="Email"
          name="email"
          sx={{ mb: 2 }}
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          label="Password"
          name="password"
          type="password"
          sx={{ mb: 2 }}
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />

        {errorMessage && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Button type="submit" variant="contained" fullWidth>
          Sign In
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          New user? Create an <Link to="/SignUp">Account here...</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
