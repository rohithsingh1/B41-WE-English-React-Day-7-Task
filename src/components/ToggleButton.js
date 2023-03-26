import {
  IconButton
} from '@mui/material';
import React from 'react';
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import {useDispatch, useSelector} from 'react-redux';
import { SetSidebarOpen } from '../redux/DrawerSlice';

function ToggleButton() {
  const dispatch=useDispatch()
  const {isSidebarOpen}=useSelector((state) => {
    return state.sidebarToggler;
  })
  return (
    <IconButton sx={{
      marginRight: "1rem",
      marginLeft:"0.5rem"
      }} onClick={
        () => dispatch(SetSidebarOpen(!isSidebarOpen)) }>
            <MenuIcon />
          </IconButton>
  )
}

export default ToggleButton