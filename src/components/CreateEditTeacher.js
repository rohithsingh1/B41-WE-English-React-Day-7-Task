import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  OutlinedInput,
  Chip
} from '@mui/material';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {SetAllTeachers} from '../redux/TeachersSlice';
import { useNavigate } from 'react-router-dom';
import ToggleButton from './ToggleButton';

const subjects=[
    "Telugu",
    "Tamil",
    "Hindi",
    "English",
    "Maths",
    "Science",
    "Social",
]

function CreateEditTeacher() {
     const {allTeachers,editTeacher}=useSelector((state) => {
    return state.teachers;
   })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let initialState={
    id: allTeachers.length+1,
    fullName: "",
    email: "",
    phoneNumber: "",
    qualifications:[],
    experience:"",
    teachingTo:[],
    subject:""
  }
  if(editTeacher!==null) {
    initialState=editTeacher;
  }
  const [user, setUser]=useState(initialState)

  const userAddHandler=async (e) => {
    e.preventDefault()
    const {id,fullName,email,phoneNumber,qualifications,experience,teachingTo,subject} = user
    const arr=[...allTeachers, {
      id,fullName,email,phoneNumber,qualifications,experience,teachingTo,subject
    }]
    dispatch(SetAllTeachers(arr));
    navigate('/teachers');
  }
  const userEditHandler=(e) => {
    e.preventDefault();
    const arr=allTeachers.map((data) => {
      let userObjCopy;
      if(data.id===user.id) {
        userObjCopy={
          ...data,
          fullName: user.fullName,
          email: user.email,
          phoneNumber:user.phoneNumber,
          qualifications:user.qualifications,
          experience:user.experience,
          teachingTo:user.teachingTo,
          subject:user.subject
        }
        return userObjCopy;
      } else {
        return data;
      }
    })
    dispatch(SetAllTeachers(arr));
    navigate('/teachers');
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
        editTeacher!==null? (
           <Typography variant="h2" sx={{
        fontSize:"2.1rem"
      }} >
       Edit Teacher
      </Typography>
        ):(
             <Typography variant="h2" sx={{
        fontSize:"2.1rem"
      }} >
       Add Teacher
      </Typography>
       ) 
      }
      </Box>
      <Grid container spacing={2} mt="1.2rem" >

        {
            // FullName feild
        }
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

        {
            // Email feild
        }
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

        {
            // phoneNumber feild
        }
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

        {
            // Qualifications feild
        }
          <Grid item xs={12} md={6} >
            <FormControl variant="standard" sx={{ minWidth: 120, width:"90%" }}>
        <InputLabel id="simple-select-standard-label" >Qualifications</InputLabel>
        <Select
          labelId="simple-select-standard-label"
          id="demo-simple-select-standard"
          multiple
            value={user.qualifications}
            label="Qualifications"
            onChange={(e)=>{
                    const value = e.target.value
                    let qualificationsArr;
                    if(typeof value === "string"){
                        qualificationsArr = value.split(",")
                    }else{
                        qualificationsArr = value;
                    }
                    setUser({...user,qualifications:qualificationsArr});
            }}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected)=>(
                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
            )}
        >
        <MenuItem value={"B.Ed"}>B.Ed</MenuItem>
        <MenuItem value={"M.Ed"}>M.Ed</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        {
            // experience feild
        }
         <Grid item xs={12} md={6} >
            <TextField
              type="number"
              required
              value={user.experience}
              onChange={(e)=>setUser({...user,experience:e.target.value})}
              label="Experience"
            placeholder='1'
             sx={{
              width:"100%"
            }}
            />
        </Grid>

        {
            // teachingTo feild
        }
          <Grid item xs={12} md={6} >
            <FormControl variant="standard" sx={{ minWidth: 120,width:"90%" }}>
        <InputLabel id="simple-select-standard-label1" >TeachingTo</InputLabel>
        <Select
          labelId="simple-select-standard-label1"
          id="demo-simple-select-standard1"
          multiple
            value={user.teachingTo}
            label="TeachingTo"
            onChange={(e)=>{
                    const value = e.target.value
                    let teachingToArr;
                    if(typeof value === "string"){
                        teachingToArr = value.split(",")
                    }else{
                        teachingToArr = value;
                    }
                    setUser({...user,teachingTo:teachingToArr});
            }}
            input={<OutlinedInput id="select-multiple-chip1" label="Chip" />}
            renderValue={(selected)=>(
                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
            )}
        >
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
        </Grid>

        {
            // subject feild
        }
         <Grid item xs={12} md={6} >
            <FormControl variant="standard" sx={{ minWidth: 120, width:"90%" }}>
        <InputLabel id="demo-simple-select-standard-label2">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label2"
          id="demo-simple-select-standard2"
           value={user.subject}
                label="Subject"
                onChange={(e)=>setUser({...user,subject:e.target.value})}
        >
            {
                subjects.map((subject)=>(
                    <MenuItem key={subject} value={subject} >{subject}</MenuItem>
                ))
            }
        </Select>
      </FormControl>
        </Grid>

        {
            // id feild
        }
         <Grid item xs={12} md={6} >
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

        {
            // Button feild
        }
        <Grid item xs={12}  >
          {
            editTeacher!==null? (
                   <Button variant="contained"
                      onClick={(e) => userEditHandler(e)}
                    sx={{
                        width:"100%"
                      }}>Edit Teacher</Button>
            ):(
                 <Button variant="contained"
                    onClick={(e) => userAddHandler(e)}
                  sx={{
                    width:"100%"
                  }}>Add Teacher</Button>
            )
          }
        </Grid>
      </Grid>
    </Box>
  )
}

export default CreateEditTeacher