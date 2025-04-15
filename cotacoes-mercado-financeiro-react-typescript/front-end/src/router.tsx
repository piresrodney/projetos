import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import Contact from "./pages/Contact";

const router: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "home", element: <Home /> },
      { path: "newuser", element: <NewUser /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

const appRouter = createBrowserRouter(router);

export default appRouter;
