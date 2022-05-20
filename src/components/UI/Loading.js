import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = (props) => {
  return (
    <Box
      sx={{
        width: props.width ? props.width : "100%",
        minHeight: props.height ? props.height : "calc(100vh - 48px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
