import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
import { Toaster } from "react-hot-toast";
function Layout() {
  return (
    <>
      <main className="main max-width">
        <Aside />
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
export default Layout;
