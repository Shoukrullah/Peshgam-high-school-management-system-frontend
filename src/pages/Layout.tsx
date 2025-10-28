import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside";
function Layout() {
  return (
    <>
      <main className="main max-width">
        <Aside />
        <section className="relative">
          <Outlet />
        </section>
      </main>
      <Toaster />
    </>
  );
}
export default Layout;
