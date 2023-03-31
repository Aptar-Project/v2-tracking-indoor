import { NavLink } from "react-router-dom";

// STYLESHEETS & ICONS
import "./sidebar.scss";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";
import { userActions } from "../../features/user/userSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Aptar ITS V 2.0</span>
        </NavLink>
      </div>
      <hr />
      <div className="center">
        <ul>
          <NavLink
            to={"/"}
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            <li>
              <DashboardIcon className="icon" />
              <span>Mappa</span>
            </li>
          </NavLink>
          <NavLink to="/sensors" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Sensori</span>
            </li>
          </NavLink>
          <NavLink to="/users" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Users</span>
            </li>
          </NavLink>
          <NavLink to="/positions" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Cronologia posizioni</span>
            </li>
          </NavLink>
          <NavLink to="/dashboard/leads" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Account</span>
            </li>
          </NavLink>
          <NavLink
            to={"/"}
            onClick={() => {
              dispatch(userActions.logout());
              localStorage.removeItem("token");
            }}
            style={{ textDecoration: "none" }}
          >
            <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};
