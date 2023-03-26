import React,{ useEffect,useState }  from 'react'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {ChevronLeft,ChevronRightOutlined} from "@mui/icons-material"
import { useLocation,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import FlexBetween from "./FlexBetween";
import { AdminDashboard } from './sidebarItems';
import { SetSidebarOpen } from '../redux/DrawerSlice';

function Sidebar({ drawerWidth,
  isNonMobile}) {
    const dispatch  = useDispatch();
    const {pathname} = useLocation();
    const [active, setActive] = useState("")
    const navigate = useNavigate();
    const {isSidebarOpen}=useSelector((state) => {
        return state.sidebarToggler;
    })
    useEffect(()=>{
        setActive(pathname.substring(1));
    },[pathname])
  return (
    <Box component="nav" >
        {
            isSidebarOpen && (
                <Drawer 
                open={isSidebarOpen}
                onClose={()=>SetSidebarOpen(!isSidebarOpen)}
                variant="persistent"
                anchor="left"
                sx={{
                  width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "white",
              backgroundColor: "#21295c",
              boxSixing: "border-box",
              borderWidth: isNonMobile && 0,
              width: drawerWidth,
            },
                }} >
                  <Box width={"100%"} >
                     <Box m={"1.5rem"} >
                <FlexBetween color={"white"} >
                  <Box
                    display={"flex"}
                    alignItems="center"
                    gap={"0.5rem"} >
                    <Typography variant="h4" fontSize={"1.33rem"} >
                      Admin
                    </Typography>
                  </Box>
                  {!isNonMobile&&(
                    <IconButton sx={{
                      cursor:"pointer"
                    }}
                      onClick={() => {
                       dispatch(SetSidebarOpen(!isSidebarOpen))
                        }} >
                      <ChevronLeft/>
                     </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {
                  AdminDashboard.map((items)=>{
                     const lcText=items.text.toLowerCase();
                    return (
                      <ListItem key={items.text}
                        disablePadding
                        onClick={() => {
                          navigate(`/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          cursor:"pointer",
                          backgroundColor:
                          active === lcText && "#ffd166",
                        color:
                          active === lcText&&"black",
                        }} >
                        <ListItemIcon
                          sx={{
                            color:active === lcText ? "black":"white",
                            ml: "1rem",
                
                          }}  >
                          {items.icon}
                        </ListItemIcon>
                        <ListItemText primary={items.text} />
                        {
                          active===lcText&&(
                            <ChevronRightOutlined sx={{
                              ml:"auto"
                            }} />
                          )
                        }
                       </ListItem>
                    )
                  })
                }
              </List>
                  </Box>
                </Drawer>
            )
        }
    </Box>
  )
}

export default Sidebar