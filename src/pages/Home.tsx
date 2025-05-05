import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAdClick = () => {
    setOpenDialog(true);
  };

  const handleStartRegistration = () => {
    setOpenDialog(false);
    navigate('/register');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Our Test Platform
        </Typography>
        
        <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4, cursor: 'pointer' }} onClick={handleAdClick}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Take Our Assessment Test
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Click here to start your journey and discover your potential!
            </Typography>
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Start Your Journey</DialogTitle>
          <DialogContent>
            <Typography>
              Would you like to proceed with the registration and take our assessment test?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleStartRegistration} variant="contained" color="primary">
              Start Registration
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Home; 