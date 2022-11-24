import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';
import Navbar from './components/navbar/Navbar';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';

declare module '@mui/material/styles' {
  interface Theme {
    mode: 'dark';
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    mode?: 'dark';
  }
}

function App() {
  let [user, setUser] = useState<User | undefined>();
  const value = { user, setUser };
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  useEffect(() => {
    let loggedInUser = window.sessionStorage.getItem('userData');
    if (loggedInUser !== null) setUser(JSON.parse(loggedInUser));
  }, [setUser]);

  return (
    <UserContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <AppRoutes></AppRoutes>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
