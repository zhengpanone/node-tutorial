import { Outlet } from "react-router";
import { Header } from "../components/header";

const Layout: React.FC = () => {
  return (
    <div className=" container mx-auto mt-10 h-full overflow-hidden">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
