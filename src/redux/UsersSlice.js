import {createSlice} from "@reduxjs/toolkit";


const usersSlice=createSlice({
  name: "users",
  initialState: {
    allUsers: [],
    editUser: null
  },
  reducers: {
    SetAllUsers: (state, action) => {
      state.allUsers=action.payload;
    },
    SetEditUser: (state, action) => {
      state.editUser=action.payload;
    }
  }
})

export default usersSlice.reducer;

export const {SetAllUsers,SetEditUser }=usersSlice.actions; 