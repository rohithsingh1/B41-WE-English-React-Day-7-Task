import {createSlice} from "@reduxjs/toolkit";


const sidebarSlice=createSlice({
  name: "sidebarToggler",
  initialState: {
    isSidebarOpen:true
  },
  reducers: {
    SetSidebarOpen: (state, action) => {
      state.isSidebarOpen=action.payload;
    },
  }
})

export default sidebarSlice.reducer;

export const {SetSidebarOpen }=sidebarSlice.actions; 