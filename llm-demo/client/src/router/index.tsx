import { type RouteObject, createBrowserRouter } from "react-router";
import { Home } from "../views/home";
import { Upload } from "../views/upload";
import Layout from "../layout";

export const rootRoutes: RouteObject[] = [
  {
    id: "root",
    element: <Layout />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/upload",
        Component: Upload,
      },
    ],
  },
];

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter(rootRoutes, {});
