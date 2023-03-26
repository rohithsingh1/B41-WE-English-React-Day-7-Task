import {configureStore} from "@reduxjs/toolkit";

import UsersSlice from "./UsersSlice";
import sidebarSlice from "./DrawerSlice";
import TeachersSlice from "./TeachersSlice";


const store=configureStore({
  reducer: {
    users: UsersSlice,
    sidebarToggler:sidebarSlice,
    teachers:TeachersSlice
  }
})

export default store;