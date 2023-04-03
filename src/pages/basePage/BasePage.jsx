// REACT ROUTER DOM
import { Outlet } from "react-router-dom";

// STYLESHEETS
import "./basePage.scss";

// COMPONENTS
import { Sidebar } from "../../components/sidebar/Sidebar";

export const BasePage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Outlet />
      </div>
    </div>
  );
};
