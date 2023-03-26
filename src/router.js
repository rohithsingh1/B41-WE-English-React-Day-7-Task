import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import CreateEditStudent from "./components/CreateEditStudent";
import CreateEditTeacher from "./components/CreateEditTeacher";
import Layout from "./components/Layout";
import Classes from "./pages/Classes";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";

export default function Router(){
    return (
        <BrowserRouter>
        <Routes>
          <Route element={<Layout/>} >
            <Route path="/" element={<Navigate to="/dashboard" replace/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/students" element={<Students/>} />
            <Route path="/create-student" element={<CreateEditStudent/>} />
            <Route path="/edit-student/:studentId" element={<CreateEditStudent/>} />
            <Route path="/teachers" element={<Teachers/>} />
            <Route path="/create-teacher" element={<CreateEditTeacher/>} />
            <Route path="/edit-teacher/:teacherId" element={<CreateEditTeacher/>} />
            <Route path="/classes" element={<Classes/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}