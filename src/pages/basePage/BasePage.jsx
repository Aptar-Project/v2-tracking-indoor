import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";
import "./basePage.scss";

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
