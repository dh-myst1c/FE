import React from "react";
import classes from "./SideBar.module.css";
import study from "../../../assets/img/study.svg";
import logo from "../../../assets/img/logo.png";
import TabList from "./TabList";
// import MenuIcon from "@mui/icons-material/Menu";
// import IconButton from "@mui/material/IconButton";

import Box from "@mui/material/Box";

const TAB_ITEMShi = [
  {
    link: "/home",
    title: "Trang chủ",
    icon: "dashboard",
  },
  {
    link: "/students",
    title: "Học sinh",
    icon: "school",
  },
  {
    link: "/classes",
    title: "Lớp học",
    icon: "people",
  },
  {
    link: "/courses",
    title: "Chương trình",
    icon: "description",
  },
  {
    link: "/transcript",
    title: "Bảng điểm",
    icon: "assessment",
  },
  {
    link: "/statistic",
    title: "Báo cáo",
    icon: "show_chart",
  },
];
const SideBar = (props) => {
  let TAB_ITEMS;
  if (props.user.maNhom === 1)
    TAB_ITEMS = [
      ...TAB_ITEMShi,
      {
        link: "/rules",
        title: "Quy định",
        icon: "chat",
      },
      {
        link: "/users",
        title: "Người dùng",
        icon: "person",
      },
    ];
  else if (props.user.maNhom === 2)
    TAB_ITEMS = [
      ...TAB_ITEMShi,
      {
        link: "/rules",
        title: "Quy định",
        icon: "chat",
      },
    ];
  else TAB_ITEMS = [...TAB_ITEMShi];
  return (
    <>
      <div className={classes["side-bar"]}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "32px" }}
        >
          <div className={classes.title}>
            <img className={classes.logo} src={logo} alt="Logo" />
            <label>Eduma</label>
          </div>
          {/* <IconButton
          sx={{ ml: "4px" }}
          size="large"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton> */}
        </Box>

        <TabList tabItems={TAB_ITEMS} />
        <img src={study} alt="Theme" />
      </div>
      <div className={classes["side-bar--virtual"]}></div>
    </>
  );
};

export default SideBar;
