import {createSlice} from "@reduxjs/toolkit";


const teachersSlice=createSlice({
  name: "teachers",
  initialState: {
    allTeachers: [],
    editTeacher: null
  },
  reducers: {
    SetAllTeachers: (state, action) => {
      state.allTeachers=action.payload;
    },
    SetEditTeacher: (state, action) => {
      state.editTeacher=action.payload;
    }
  }
})

export default teachersSlice.reducer;

export const {SetAllTeachers,SetEditTeacher }=teachersSlice.actions; 