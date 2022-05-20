import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Box from "@mui/material/Box";
import StudentsList from "../components/students/StudentsList";
import Profile from "./Profile";

const Students = () => {
  let { path } = useRouteMatch();

  return (
    <Box
      sx={{ padding: "32px", width: "100%", minHeight: "calc(100vh - 48px)" }}
    >
      <Switch>
        <Route exact path={path}>
          <StudentsList />
        </Route>
        <Route exact path={`${path}/profile/:id`}>
          <Profile />
        </Route>
      </Switch>
    </Box>
  );
};

export default Students;
