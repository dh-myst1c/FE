import React from "react";
import Box from "@mui/material/Box";
import CoursesList from "../components/courses/CoursesList";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SubjectsList from "../components/courses/SubjectsList";

const Courses = () => {
  const { path } = useRouteMatch();
  return (
    <Box
      sx={{ padding: "32px", width: "100%", minHeight: "calc(100vh - 48px)" }}
    >
      <Switch>
        <Route exact path={path}>
          <CoursesList />
        </Route>
        <Route exact path={`${path}/subjects`}>
          <SubjectsList />
        </Route>
      </Switch>
    </Box>
  );
};

export default Courses;
