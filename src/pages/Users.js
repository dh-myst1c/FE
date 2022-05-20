import React from "react";
import Box from "@mui/material/Box";
import UsersList from "../components/users/UsersList";

const Users = () => {
  return (
    <Box
      sx={{ padding: "32px", width: "100%", minHeight: "calc(100vh - 48px)" }}
    >
      <UsersList />
    </Box>
  );
};

export default Users;
