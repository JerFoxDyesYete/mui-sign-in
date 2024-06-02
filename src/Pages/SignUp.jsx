import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { supabaseClient } from '../Services/supabaseClient';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = formData;
  
    try {
      // Sign up the user
      const { user, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error('Error signing up:', error.message);
        // Display user-friendly error message
        alert('An error occurred during sign-up. Please try again later.');
      } else {
        // Insert additional data into the profiles table
        const { data, error: insertError } = await supabaseClient
          .from('profiles')
          .insert([
            { id: user.id, first_name: firstName, last_name: lastName },
          ]);
  
        if (insertError) {
          console.error('Error inserting user profile:', insertError.message);
          // Display user-friendly error message
          alert('An error occurred during sign-up. Please try again later.');
        } else {
          console.log('User signed up and profile created:', data);
          // Redirect or perform additional actions here
        }
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Display user-friendly error message
      alert('An error occurred during sign-up. Please try again later.');
    }
  };
  
  // Introduce delay before submitting sign-up form again
  const delayBeforeSubmit = () => {
    // Adjust delay time as needed (e.g., 5 seconds)
    setTimeout(() => {
      handleSubmit();
    }, 5000); // 5000 milliseconds = 5 seconds
  };
  

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95vh',
        textAlign: 'center',
      }}
    >
      <Box
        component="form"
        sx={{
          p: 3,
          borderRadius: '16px',
          border: 1,
          width: '100%',
          maxWidth: 400,
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          REGISTER
        </Typography>
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
              }
              label="I agree to the terms and Privacy Policy."
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Sign Up
            </Button>
            <Typography align="center" sx={{ p: 1 }}>
              or
            </Typography>
            <Button component={Link} to="/Dashboard" fullWidth variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SignUp;
