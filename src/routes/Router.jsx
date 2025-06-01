import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Nav from "../component/Nav";
import Footer from "../component/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Chat from "../pages/chat";
import UserProfile from "../pages/UserProfile";

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "userProfile/:id", element: <UserProfile /> },
      { path: "chat", element: <Chat /> },
    ],
  },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;
