import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import React from "react";
import { DrawerContext } from "../../Contexts/drawerContext";
import { NavLink } from "react-router-dom";

export default () => {
  const { logoutService, user } = useBoundStore((state) => state);
  const { close } = React.useContext(DrawerContext);

  const handleClick = (action) => {
    close();
    if (action) action();
  };

  const items = !user
    ? [
      <NavLink key="1" onClick={handleClick} className={classes.link} end to="/">
        Home
      </NavLink>,
      <NavLink key="2" onClick={handleClick} className={classes.link} to="/login">
        Login
      </NavLink>,
    ]
    : [
      <NavLink key="3" onClick={handleClick} className={classes.link} end to="/posts">
        Posts
      </NavLink>,
      <NavLink key="4" onClick={handleClick} className={classes.link} end to="/posts/create">
        Create
      </NavLink>,
      <NavLink key="5" onClick={() => handleClick(logoutService)} className={classes.link} to="/">
        Logout
      </NavLink>,
    ];
  return [items];
};
