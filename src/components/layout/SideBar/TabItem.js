import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./TabItem.module.css";
const TabItem = (props) => {
  return (
    <li>
      <NavLink
        activeClassName={classes.active}
        className={classes["tab-item"]}
        to={props.link}
      >
        <span className="material-icons">{props.icon}</span> {props.title}
      </NavLink>
    </li>
  );
};

export default TabItem;
