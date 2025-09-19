import { NavLink, useLocation } from "react-router";

export function Header() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className=" flex justify-center gap-8">
      <NavLink
        to="/"
        className={`text-2xl font-bold ${
          location.pathname === "/" ? "text-blue-500" : ""
        }`}
      >
        聊天
      </NavLink>
      <NavLink
        to="/upload"
        className={`text-2xl font-bold ${
          location.pathname === "/upload" ? "text-blue-500" : ""
        }`}
      >
        文件上传
      </NavLink>
    </div>
  );
}
