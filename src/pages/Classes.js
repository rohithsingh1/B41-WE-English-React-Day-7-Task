import {
  Box,
  Grid,
  Chip,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tab

} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import {useDispatch,useSelector} from "react-redux";
import React,{useEffect,useState} from 'react';
import {SetAllUsers} from '../redux/UsersSlice';
import {SetAllTeachers} from '../redux/TeachersSlice';
import ToggleButton from '../components/ToggleButton';
import { userData } from '../data/StudentsData';
import { teachersData } from '../data/TeachersData';
import {DataGrid} from '@mui/x-data-grid';

function Classes() {
     const dispatch = useDispatch()
  const {allUsers}=useSelector((state) => {
    return state.users;
  })
  const {allTeachers}=useSelector((state) => {
    return state.teachers;
  })
  const initialState = {
    students:[],
    teachers:[]
  }
  const [studentTeacherData, setStudentTeacherData] = useState(initialState)
  const [classData, setClassData] = useState(0)
  const [value, setValue] = useState('0')

  const TabhandleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if(allUsers.length===0){
        dispatch(SetAllUsers(userData));
    }
    if(allUsers.length!==0){
        setClassData(allUsers[0].classNo);
    }
    // eslint-disable-next-line
  },[allUsers]);


  useEffect(()=>{
     allTeachers.length===0 && dispatch(SetAllTeachers(teachersData));
     // eslint-disable-next-line
  },[allTeachers])


  useEffect(() => {
    if(classData){
         const studentFilteredData = allUsers.filter((student)=>{
            return student.classNo === classData
        })
        const teachersFilteredData = allTeachers.filter((teacher)=>{
            return teacher.teachingTo.some((classnoarg)=>classnoarg===classData);
        })
        setStudentTeacherData({
            students:studentFilteredData,
            teachers:teachersFilteredData,
        })
    }
    // eslint-disable-next-line
  },[classData])

  const studentColumns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
    },
    {
      field: "fullName",
      headerName: "FullName",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.7,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "classNo",
      headerName: "ClassNo",
      flex: 0.2,
    }
  ];

   const teachersColumns = [
    {
      field: "id",
      headerName: "ID",
      flex:0.1
    },
    {
      field: "fullName",
      headerName: "FullName",
      flex:0.35
    },
    {
      field: "email",
      headerName: "Email",
      flex:0.4
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.4,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "qualifications",
      headerName: "Qualifications",
      flex: 0.6,
      renderCell:(params)=>{
        const {qualifications} = params.row;
        const returnData = qualifications.map((data,index)=>{
            return (
                <Chip label={data} key={index} sx={{
                    margin:"0.26rem"
                }} />
            )
        })
        return returnData;
      }
    },
    {
      field: "experience",
      headerName: "Experience",
      flex: 0.1,
    },
     {
      field: "teachingTo",
      headerName: "TeachingTo",
      flex: 1,
      renderCell:(params)=>{
        const {teachingTo} = params.row;
        const returnData = teachingTo.map((data,index)=>{
            return (
                <Chip label={`${data}class`} key={index} sx={{
                    margin:"0.1rem",
                    flexWrap:"wrap"
                }} />
            )
        })
        return returnData;
      }
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 0.3,
    }
  ];
  return (
    <Box width={"99%"} >
         <ToggleButton />
        {/* <Box sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems:"center"
      }}>
        <Typography variant="h2" sx={{
        fontSize:"2.4rem"
      }} >
       ClassNo
      </Typography>
      <Box>

      </Box>
      </Box> */}

       <Grid container spacing={2} mt="1.2rem" >

         <Grid item xs={3} >
            <Typography variant="h2" sx={{
                fontSize:"2.4rem"
            }} >
                ClassNo
            </Typography>
        </Grid>

         <Grid item xs={6} md={3} >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label" sx={{
            fontSize:"1rem"
        }} >ClassNo</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
           value={classData}
                label="ClassNo"
                onChange={(e)=>setClassData(e.target.value)}
        >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
        </Select>
      </FormControl>
        </Grid>
       </Grid>

       <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={TabhandleChange}
            aria-label='Tabs example'
            textColor='secondary'
            indicatorColor='secondary'
            centered
            >
            <Tab
              label='Students'
              value='0'
            />
            <Tab label='Teachers' value='1' />
          </TabList>
        </Box>
        <TabPanel value='0'>
             <Box mt={"5px"} height="60vh">
        {
            studentTeacherData.students.length!==0 && (
                <DataGrid
          getRowId={(row) => row.id}
          rows={studentTeacherData.students}
         columns={studentColumns} />
            )
        }
      </Box>
        </TabPanel>
        <TabPanel value='1'>
             <Box mt={"20px"} height="60vh">
        {
            studentTeacherData.teachers.length!==0 && (
                <DataGrid
          getRowId={(row) => row.id}
          rows={studentTeacherData.teachers}
         columns={teachersColumns} />
            )
        }
      </Box>
        </TabPanel>
      </TabContext>
    </Box>
       
    </Box>
  )
}

export default Classes