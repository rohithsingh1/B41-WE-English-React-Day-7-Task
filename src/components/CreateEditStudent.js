import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetAllUsers} from '../redux/UsersSlice';
import { useNavigate } from 'react-router-dom';
import ToggleButton from './ToggleButton';

function CreateEditStudent() {
    const {allUsers,editUser}=useSelector((state) => {
    return state.users;
   })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let initialState={
    id: allUsers.length+1,
    fullName: "",
    email: "",
    phoneNumber: "",
    classNo:6
  }
  if(editUser!==null) {
    initialState=editUser;
  }
  const [user, setUser]=useState(initialState)

  const userAddHandler=async (e) => {
    e.preventDefault()
    const {id,fullName,email,phoneNumber,classNo} = user
    const arr=[...allUsers, {
      id,fullName,email,phoneNumber,classNo
    }]
    dispatch(SetAllUsers(arr));
    navigate('/students');
  }
  const userEditHandler=(e) => {
    e.preventDefault();
    const arr=allUsers.map((data) => {
      let userObjCopy;
      if(data.id===user.id) {
        userObjCopy={
          ...data,
          fullName: user.fullName,
          email: user.email,
          phoneNumber:user.phoneNumber,
          classNo:user.classNo
        }
        return userObjCopy;
      } else {
        return data;
      }
    })
    dispatch(SetAllUsers(arr));
    navigate('/students');
  }
  return (
     <Box>
      <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"center"
      }}>
        <ToggleButton />
         {
        editUser!==null? (
           <Typography variant="h2" sx={{
        fontSize:"2.1rem"
      }} >
       Edit Student
      </Typography>
        ):(
             <Typography variant="h2" sx={{
        fontSize:"2.1rem"
      }} >
       Add Student
      </Typography>
       ) 
      }
      </Box>
      <Grid container spacing={2} mt="1.2rem" >
        <Grid item xs={12} md={6} >
           <TextField
              required
              value={user.fullName}
              onChange={(e)=>setUser({...user,fullName:e.target.value})}
              label="fullName"
            placeholder='Rohith Singh'
            sx={{
              width:"100%"
            }}
            />
        </Grid>
         <Grid item xs={12} md={6} >
            <TextField
              type={"email"}
              required
              value={user.email}
              onChange={(e)=>setUser({...user,email:e.target.value})}
              label="Email"
            placeholder='rohith@gmail.com'
             sx={{
              width:"100%"
            }}
            />
        </Grid>
         <Grid item xs={12} md={6} >
            <TextField
              type="number"
              required
              value={user.phoneNumber}
              onChange={(e)=>setUser({...user,phoneNumber:e.target.value})}
              label="phoneNumber"
            placeholder='789456123'
             sx={{
              width:"100%"
            }}
            />
        </Grid>
         <Grid item xs={6} md={3} >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">ClassNo</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
           value={user.classNo}
                label="ClassNo"
                onChange={(e)=>setUser({...user,classNo:e.target.value})}
        >
          <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
        </Grid>
         <Grid item xs={6} md={3} >
           <TextField
            required
              //placeholder={user.id}
              defaultValue={user.id}
              InputProps={{
                readOnly: true,
              }}
            label="RollNo"
             sx={{
              width:"100%"
            }}
            />
        </Grid>
        <Grid item xs={12}  >
          {
            editUser!==null? (
                   <Button variant="contained"
                      onClick={(e) => userEditHandler(e)}
                    sx={{
                        width:"100%"
                      }}>Edit Student</Button>
            ):(
                 <Button variant="contained"
                    onClick={(e) => userAddHandler(e)}
                  sx={{
                    width:"100%"
                  }}>Add Student</Button>
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateEditStudent