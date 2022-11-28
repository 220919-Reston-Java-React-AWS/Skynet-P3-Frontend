import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext, User } from './context/user.context';
import { AppRoutes } from './router/AppRoutes';
import Navbar from './components/navbar/Navbar';
import { createTheme, CssBaseline, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { ThemeContext } from './context/theme.context';
import bg1 from './components/squares.jpg';

function App() {
  const [user, setUser] = useState<User | undefined>();
  const [themeContext, setThemeContext] = useState(true);
  const uservalue = { user, setUser };

  const theme = createTheme({
    palette: {
      mode: themeContext ? 'dark' : 'light',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: themeContext
              ? `linear-gradient(90deg, rgba(53, 40, 24,0.9) 0%, rgba(53, 40, 24, 0.9) 100%), url(${bg1})`
              : `linear-gradient(90deg, rgba(225,245,255,0.9) 0%, rgba(225,245,255,0.9) 100%), url(${bg1})`,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: !themeContext ? '#ffffff3c' : '#00000036',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
          },
        },
      },
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
          <CssBaseline />{' '}
          <Paper>
            <Router>
              <Navbar />
              <AppRoutes></AppRoutes>
            </Router>{' '}
          </Paper>
        </ThemeProvider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
