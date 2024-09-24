import React from "react";
import Search from "./Search";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Search />
      <Outlet />
    </div>
  );
};

export default Layout;
