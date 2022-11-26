import { useEffect, useState } from 'react';
import {
  Link,
  Box,
  AppBar,
  Typography,
  IconButton,
  Divider,
  List,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { apiLogout } from '../../remote/social-media-api/auth.api';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { ThemeContext } from '../../context/theme.context';
import CustomSwitch from '../CustomSwitch';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(<></>);
  const [tipTitle, setTipTitle] = useState('');
  const { themeContext, setThemeContext } = useContext(ThemeContext);

  useEffect(() => {
    if (user) {
      setLoggedIn(<LogoutIcon />);
      setTipTitle('Logout');
    } else {
      setLoggedIn(<LoginIcon />);
      setTipTitle('Login');
    }
  }, [user]);

  function handleAuth() {
    if (user) {
      apiLogout();
      setUser();
    } else {
      navigate('/login');
    }
  }

  const toggleTheme = () => {
    setThemeContext(!themeContext);
  };

  const drawerWidth = 240;

  const navItems = user
    ? [
        { text: 'help', link: '/help' },
        { text: 'followers', link: '/followers' },
        { text: 'following', link: '/following' },
      ]
    : [
        { text: 'signup', link: '/register' },
        { text: 'help', link: '/help' },
      ];
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' component={'nav'}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link component={RouterLink} to='/' color='textPrimary'>
              SkyArt
            </Link>
          </Typography>
          <CustomSwitch
            onClick={toggleTheme}
            checked={themeContext}
          ></CustomSwitch>
          <div>
            {user && (
              <Link component={RouterLink} to='/profile'>
                <PersonIcon sx={{ verticalAlign: 'middle' }} />
              </Link>
            )}
            <Tooltip disableFocusListener disableTouchListener title={tipTitle}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={() => handleAuth()}
                color='inherit'
              >
                {loggedIn}
              </IconButton>
            </Tooltip>
          </div>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link
                component={RouterLink}
                to={item.link}
                key={item.text}
                sx={{ color: '#fff', p: 2 }}
              >
                {item.text}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
