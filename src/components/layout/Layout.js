import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN } from '../../lib/routes';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import UserContext from '../../contexts/UserContext';

const Layout = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Conditionally navigate to LOGIN route here, if needed
    console.log("User:" + currentUser);
    if (currentUser === null) navigate(LOGIN);
  }, []); // The empty dependency array ensures this effect runs once

  if (currentUser === null) return (<></>);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      {location.pathname === "/" ? <Dashboard /> : <Outlet />}
    </Box>
  );
}

export default Layout;
