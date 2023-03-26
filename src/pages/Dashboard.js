import React from 'react'
import { Box,Grid,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../components/ToggleButton';

const DashboardData=[
  {
    color: "#4e73df",
    text: "Students"
  },
  {
    color: "#1cc88a",
    text: "Teachers"
  },
  {
    color: "#36b9cc",
    text: "Classes"
  }
];

function Dashboard() {
    const navigate = useNavigate();
  return (
    <Box width={"99%"} >

        <Box sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems:"center"
    }} >
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"center"
      }} >
        <ToggleButton/>
        <Typography variant="h2" sx={{
            fontSize:"2.1rem"
          }} >
       Dashboard
        </Typography>
      </Box>
    </Box>

            <Grid container spacing={2} mt="0.58rem" >
        {
          DashboardData.map((data,index) => {
            const lcText=data.text.toLowerCase();
            return (
                <Grid key={index} item xs={12} md={6} lg={3} >
          <Box sx={{
            borderLeft: `0.25rem solid ${data.color} !important`,
            paddingBottom: "0.5rem !important",
            paddingTop: "0.5rem !important",
            boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            wordWrap: "break-word",
            backgroundColor: "#fff",
            backgroundClip: "border-box",
            border: "1px solid #e3e6f0",
            borderRadius:"0.35rem",
            cursor:"pointer"
          }} onClick={() => {
                          navigate(`/${lcText}`);
                        }} >
            <Box sx={{
              p: "1.25rem",
              flex:"1 1 auto"
            }} >
              <Box sx={{
                alignItems: "center",
                marginRight: 0,
                marginLeft: 0,
                display: "flex",
                flexWrap: "wrap",
                
              }} >
                <Box sx={{
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginRight: "0.5rem !important",
                  flexBasis: 0,
                  flexGrow: 1,
                  maxWidth: "100%",
                  width:"100%",
                }} >
                  <Box sx={{
                    fontSize: "1.5rem",
                    color: `${data.color}!important`,
                    fontWeight: "700 !important",
                    marginBottom: "0.25rem !important",
                    
                      }} >{data.text}</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
            )
    })
        }
      </Grid>
    </Box>
  )
}

export default Dashboard