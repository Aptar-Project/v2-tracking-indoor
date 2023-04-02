import { NavLink } from "react-router-dom";

// STYLESHEETS & ICONS
import "./sidebar.scss";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useDispatch } from "react-redux";
import { userActions } from "../../features/user/userSlice";
import { Typography } from "@mui/material";

export const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/" style={{ textDecoration: "none", marginTop: "3%" }}>
          <Typography variant="h6" className="logo">
            Aptar ITS V 2.0
          </Typography>
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
              <Typography variant="span"> Mappa</Typography>
            </li>
          </NavLink>
          <NavLink to="/sensors" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <Typography variant="span"> Sensori</Typography>
            </li>
          </NavLink>
          <NavLink to="/tags" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <Typography variant="span"> Tags</Typography>
            </li>
          </NavLink>
          <NavLink to="/account" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <Typography variant="span"> Account</Typography>
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
              <Typography variant="span">Logout</Typography>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};
