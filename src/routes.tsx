import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import Attendance from "./pages/Attendance";
import Branch from "./pages/Branch";
import ErrorPage from "./pages/ErrorPage";
import BranchPerId from "./components/BranchPerId";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "classes", element: <Classes /> },
      { path: "students", element: <Student /> },
      { path: "teachers", element: <Teacher /> },
      { path: "attendances", element: <Attendance /> },
      {
        path: "branches",
        element: <Branch />,
      },
      {
        path: "branches/:id",
        element: <BranchPerId />,
      },
    ],
  },
]);
export default router;
