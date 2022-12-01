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
import Following from '../users/Following';
import Followers from '../users/Followers';

export default function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(<></>);
  const [tipTitle, setTipTitle] = useState('');
  const { themeContext, setThemeContext } = useContext(ThemeContext);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);

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
      navigate('/');
      setUser();
    } else {
      navigate('/login');
    }
  }

  const toggleTheme = () => {
    setThemeContext(!themeContext);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleFollowingToggle = () => {
    setFollowingOpen(!followingOpen);
  };

  const handleFollowersToggle = () => {
    setFollowersOpen(!followersOpen);
  };

  const drawerWidth = 240;

  const navItems = user
    ? [
        { text: 'followers', onclick: () => handleFollowersToggle() },
        { text: 'following', onclick: () => handleFollowingToggle() },
      ]
    : [{ text: 'signup', onclick: () => navigate('/register') }];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        SkyArt
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={item.onclick}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const followingDrawer = (
    <Box onClick={handleFollowingToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Following
      </Typography>
      <Divider />
      {user && <Following user={user} />}
    </Box>
  );

  const followersDrawer = (
    <Box onClick={handleFollowersToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        Followers
      </Typography>
      <Divider />
      <Followers />
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
                color='default'
              >
                {loggedIn}
              </IconButton>
            </Tooltip>
          </div>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button onClick={item.onclick} key={item.text} sx={{ p: 2 }}>
                {item.text}
              </Button>
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
        <Drawer
          variant='temporary'
          open={followingOpen}
          onClose={handleFollowingToggle}
          // anchor='right'
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {followingDrawer}
        </Drawer>
        <Drawer
          variant='temporary'
          open={followersOpen}
          onClose={handleFollowersToggle}
          // anchor='right'
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {followersDrawer}
        </Drawer>
      </Box>
    </Box>
  );
}
