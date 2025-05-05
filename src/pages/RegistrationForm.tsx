import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import axios from 'axios';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      mobile: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      localStorage.setItem('userId', response.data._id);
      navigate('/test');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error appropriately
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Registration
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
            >
              Start Test
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegistrationForm; 