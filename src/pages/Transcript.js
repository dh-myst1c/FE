import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import TranscriptList from "../components/transcript/TranscriptList";
const Transcript = () => {
  let { path } = useRouteMatch();
  return  (
    <Box
      sx={{ padding: "32px", width: "100%", minHeight: "calc(100vh - 48px)" }}
    >      
      <Switch>
        <Route exact path={path}>
          <TranscriptList />
        </Route>


      </Switch>
    </Box>
  );
};

export default Transcript;
