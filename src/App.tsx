import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import RegistrationForm from './pages/RegistrationForm';
import Test from './pages/Test';
import Results from './pages/Results';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
