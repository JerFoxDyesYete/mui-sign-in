import { TextField, Box, Button, Typography } from "@mui/material";
import React from "react";

function App() {
  return (
    <> <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box textAlign={"center"} maxWidth={300} sx={{outline:1, p:5, borderRadius:2}}>
        <Typography variant="h5" sx={{mb:2, fontWeight:"bold"}} >Sign in!</Typography>
        <TextField variant="outlined" label="Username" sx={{ mb: 2 }} fullWidth></TextField>
        <TextField variant="outlined" label="Passwowd" sx={{ mb: 2 }} fullWidth></TextField>
        <Button variant="contained" fullWidth> Sign In</Button>
      </Box>
    </Box>
    </>
  );
}

export default App;