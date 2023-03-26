import {
  Box,
  Grid
} from '@mui/material';
import {EditOutlined} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import React,{useEffect} from 'react'
import {SetAllUsers,SetEditUser} from '../redux/UsersSlice';
import { userData } from '../data/StudentsData';
import {DataGrid} from '@mui/x-data-grid';
import CommonHeader from '../components/CommonHeader';



function Students() {
    const dispatch = useDispatch()
  const {allUsers}=useSelector((state) => {
    return state.users;
  })

  const navigate = useNavigate()

  const columns = [
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
    },
    {
        field: "_id",
      headerName: "Action",
      flex: 0.2,
      renderCell:(params)=>{
        const {id,fullName,email,phoneNumber,classNo} = params.row;
        return (
            <EditOutlined sx={{
                cursor:"pointer"
            }} onClick={()=>{
                dispatch(SetEditUser({id,fullName,email,phoneNumber,classNo}))
                navigate(`/edit-student/${id}`)
            }} />
        )
      }
    }
  ];
  useEffect(() => {
    allUsers.length===0 && dispatch(SetAllUsers(userData))
    // eslint-disable-next-line
  },[allUsers])
  return (
     <Box width={"99%"} >

        <CommonHeader title="Students" path="/create-student" />

         <Grid container sx={{
        marginTop:"1.2rem"
      }} >
         <Grid item xs={12} >
           <Box mt={"20px"} height="80vh">
        {
            allUsers.length!==0 && (
                <DataGrid
          getRowId={(row) => row.id}
          rows={allUsers}
         columns={columns} />
            )
        }
      </Box>
         </Grid>
      </Grid>
    </Box>
  )
}

export default Students