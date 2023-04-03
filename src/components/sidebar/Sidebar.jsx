// REACT ROUTER DOM
import { NavLink } from "react-router-dom";

// STYLESHEETS
import "./sidebar.scss";
import { Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import SensorsIcon from "@mui/icons-material/Sensors";
import SellIcon from "@mui/icons-material/Sell";

// REACT ROUTER DOM
import { useDispatch } from "react-redux";
import { userActions } from "../../features/user/userSlice";

export const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <div className="top">
        <NavLink to="/" style={{ textDecoration: "none", marginTop: "3%" }}>
          <Typography variant="h6" className="logo">
            Aptar ITS
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
              <MapIcon className="icon" />
              <Typography variant="span"> Mappa</Typography>
            </li>
          </NavLink>
          <NavLink to="/sensors" style={{ textDecoration: "none" }}>
            <li>
              <SensorsIcon className="icon" />
              <Typography variant="span"> Sensori</Typography>
            </li>
          </NavLink>
          <NavLink to="/tags" style={{ textDecoration: "none" }}>
            <li>
              <SellIcon className="icon" />
              <Typography variant="span"> Tags</Typography>
            </li>
          </NavLink>
          <NavLink to="/account" style={{ textDecoration: "none" }}>
            <li>
              <PersonIcon className="icon" />
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
