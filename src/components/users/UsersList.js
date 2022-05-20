import React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UsersTable from "./UsersTable";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import useHttp from "../../hooks/use-http";
import { getAllUsers } from "../../lib/api";
import Loading from "../UI/Loading";
const UsersList = () => {
  const { sendRequest, error, data, status } = useHttp(getAllUsers, true);
  const [allUsers, setAllUsers] = React.useState([]);
  const [searchUsers, setSearchUsers] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [editData, setEditData] = React.useState(null);

  const delUsers = (Users) => {
    let newUsers = [...allUsers];
    for (let i = 0; i < Users.length; i++) {
      newUsers = newUsers.filter((x) => x.id !== Users[i]);
    }
    console.log(newUsers);
    setAllUsers(newUsers);
  };
  const updateUser = (User) => {
    let newUsers = allUsers.map((x) => (x.id !== User.id ? x : User));
    setAllUsers(newUsers);
  };
  const addUser = (User) => {
    let newUsers = [...allUsers];
    newUsers.push(User);

    setAllUsers(newUsers);
  };
  const [isAddUserDialogVisible, setIsAddUserDialogVisible] =
    React.useState(false);
  const [isEditUserDialogVisible, setIsEditUserDialogVisible] =
    React.useState(false);
  const showAddUserHandler = () => {
    setIsAddUserDialogVisible(true);
  };
  const hideAddUserHandler = () => {
    setIsAddUserDialogVisible(false);
  };
  const showEditUserHandler = (data) => {
    setEditData(data);
    setIsEditUserDialogVisible(true);
  };
  const hideEditUserHandler = () => {
    setIsEditUserDialogVisible(false);
  };

  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  React.useEffect(() => {
    if (status === "completed" && data) {
      setAllUsers(data);
    }
  }, [data, status]);
  React.useEffect(() => {
    if (query === "" || !query) {
      setSearchUsers(allUsers);
    } else {
      setSearchUsers(
        allUsers.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [allUsers, query]);
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Breadcrumbs mb="16px" aria-label="breadcrumb">
        <Typography color="text.primary">Người dùng</Typography>
      </Breadcrumbs>
      <Box
        mb="16px"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
          Danh sách người dùng
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            id="search"
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            sx={{ marginRight: "8px" }}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={showAddUserHandler}
            variant="contained"
            color="success"
          >
            Thêm
          </Button>
        </Box>
      </Box>
      <Grid
        container
        sx={{
          boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Grid item xs={12}>
          <UsersTable
            onShowEdit={showEditUserHandler}
            data={searchUsers}
            delUsers={delUsers}
          />
        </Grid>
      </Grid>
      {isAddUserDialogVisible && (
        <AddUserForm
          open={isAddUserDialogVisible}
          onClose={hideAddUserHandler}
          addUser={addUser}
        />
      )}
      {isEditUserDialogVisible && (
        <EditUserForm
          open={isEditUserDialogVisible}
          onClose={hideEditUserHandler}
          editUser={editData}
          updateUser={updateUser}
        />
      )}
    </>
  );
};

export default UsersList;
