import React from "react";
import Search from "./Search";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen  items-center">
      <Search />
      <Outlet />
    </div>
  );
};

export default Layout;
