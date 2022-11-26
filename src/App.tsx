import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';
import Navbar from './components/navbar/Navbar';
import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { ThemeContext } from './context/theme.context';

function App() {
  const [user, setUser] = useState<User | undefined>();
  const [themeContext, setThemeContext] = useState(true);
  const uservalue = { user, setUser };

  const theme = createTheme({
    palette: {
      mode: themeContext ? 'dark' : 'light',
    },
  });
  useEffect(() => {
    let loggedInUser = window.sessionStorage.getItem('userData');
    if (loggedInUser !== null) setUser(JSON.parse(loggedInUser));
  }, [setUser]);

  return (
    <UserContext.Provider value={uservalue}>
      <ThemeContext.Provider value={{ themeContext, setThemeContext }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar />
            <AppRoutes></AppRoutes>
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
