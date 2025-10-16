import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Aside from "./components/Aside";
import Heading from "./components/Heading";

const router = createBrowserRouter([
  {path:'/', element: <Aside />}
])

function App() {
  return (
    <>
        {/* <Aside /> */}
        <RouterProvider router={router} />

    </>
  );
}

export default App;
