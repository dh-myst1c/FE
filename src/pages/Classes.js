import React from "react";
import Box from "@mui/material/Box";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ClassList from "../components/classes/ClassList";
import EditClass from "./EditClass";
import useHttp from "../hooks/use-http";
import { getAllSems } from "../lib/api";
import Loading from "../components/UI/Loading";

const Classes = () => {
  let { path } = useRouteMatch();
  const { sendRequest, data, error, status } = useHttp(getAllSems, true);
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") return <Loading />;
  if (error) return <p>Đã có lỗi xảy ra</p>;

  return (
    <Box
      sx={{ padding: "32px", width: "100%", minHeight: "calc(100vh - 48px)" }}
    >
      <Switch>
        <Route exact path={path}>
          <ClassList hk={data} />
        </Route>
        <Route exact path={`${path}/:id`}>
          <EditClass hk={data} />
        </Route>
      </Switch>
    </Box>
  );
};

export default Classes;
