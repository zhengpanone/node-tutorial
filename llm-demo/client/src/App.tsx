import { App as AntdApp } from "antd";
import { RouterProvider } from "react-router";
import "./App.css";
import router from "./router";

function App() {
  return (
    <AntdApp component={false}>
      <RouterProvider router={router}></RouterProvider>
    </AntdApp>
  );
}

export default App;
