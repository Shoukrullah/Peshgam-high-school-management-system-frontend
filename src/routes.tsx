import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Attendance from "./pages/Attendance";
import Branch from "./pages/Branch";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: 'Error',
        children: [
            {index: true, element: <Dashboard />},
            {path: 'classes',element: <Classes />},
            {path: 'students', element: <Student />},
            {path: 'teachers', element: <Teacher />},
            {path: 'attendances',element: <Attendance />},
            {path: 'branches',element: <Branch />}
        ]
    }
]);
export default router