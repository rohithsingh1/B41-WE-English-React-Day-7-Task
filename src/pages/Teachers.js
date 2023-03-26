import {
  Box,
  Chip

} from '@mui/material';
import {EditOutlined} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import React,{useEffect} from 'react';
import {SetAllTeachers,SetEditTeacher} from '../redux/TeachersSlice';
import { teachersData } from '../data/TeachersData';
import {DataGrid} from '@mui/x-data-grid';
import CommonHeader from '../components/CommonHeader';

function Teachers() {
     const dispatch = useDispatch()
  const {allTeachers}=useSelector((state) => {
    return state.teachers;
  })

   const columns = [
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
    },
    {
        field: "_id",
      headerName: "Action",
      flex: 0.2,
      renderCell:(params)=>{
        const {id,fullName,email,phoneNumber,qualifications,experience,teachingTo,subject} = params.row;
        return (
            <EditOutlined sx={{
                cursor:"pointer"
            }} onClick={()=>{
                dispatch(SetEditTeacher({id,fullName,email,phoneNumber,qualifications,experience,teachingTo,subject}))
                navigate(`/edit-teacher/${id}`)
            }} />
        )
      }
    }
  ];

  const navigate = useNavigate()
  useEffect(() => {
    allTeachers.length===0 && dispatch(SetAllTeachers(teachersData))
    // eslint-disable-next-line
  },[allTeachers])
  return (
    <Box width={"99%"} >
        <CommonHeader title="Teachers" path="/create-teacher" />
      <Box mt={"20px"} height="70vh">
        {
            allTeachers.length!==0 && (
                <DataGrid
          getRowId={(row) => row.id}
          rows={allTeachers}
         columns={columns} />
            )
        }
      </Box>
    </Box>
  )
}

export default Teachers