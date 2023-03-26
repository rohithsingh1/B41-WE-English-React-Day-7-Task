import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import {Outlet} from 'react-router-dom';
import Sidebar from './Sidebar';

function Layout() {
     const isNonMobile=useMediaQuery("(min-width: 600px)");
     console.log("isNonMobile = ",isNonMobile);
  return (
     <Box display={isNonMobile? "flex":"block"}
      height="100%"
    >
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="238px" />
      <Box flexGrow={1} sx={{
        boxSizing:"border-box"
      }} >
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout