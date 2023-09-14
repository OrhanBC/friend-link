import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { useLogout } from '../../hooks/auth';
import PeopleIcon from '@mui/icons-material/People';
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD, PROFILE, REQUESTS, SEARCH } from '../../lib/routes';

const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const { logout } = useLogout();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pathIndex = () => {
    if (location.pathname == "/") {
        return 0;
    }
    else if (location.pathname == "/search") {
        return 1;
    }
    if (location.pathname == "/profile") {
        return 2;
    }
    if (location.pathname == "/requests") {
        return 3;
    }
  }

  const handleClick = (index) => {
    if (index === 0) {
        navigate(DASHBOARD);
    }
    else if (index === 1) {
        navigate(SEARCH);
    }
    else if (index === 2) {
        navigate(PROFILE);
    }
    else if (index === 3) {
        navigate(REQUESTS)
    }
    else if (index === 4) {
        logout( {} );
    }
  }

  const drawer = (
    <div>
      <Typography variant='h4' sx={{fontFamily: 'Concert One, cursive', margin: 4}}>FriendLink</Typography>
      <Toolbar />
      <Divider />
      <List>
        {['Home', 'Search', 'Profile', 'Friend Requests', 'Log Out'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={ () => handleClick(index) } selected={ index === pathIndex() }>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : <></>}
                {index === 1 ? <SearchIcon /> : <></>}
                {index === 2 ? <PersonIcon /> : <></>}
                {index === 3 ? <PeopleIcon /> : <></>}
                {index === 4 ? <LogoutIcon /> : <></>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

export default Sidebar;
