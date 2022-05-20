import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import useHttp from "../../hooks/use-http";
import { addUser } from "../../lib/api";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const roles = ["Admin", "Hiệu trưởng", "Giáo vụ"];
const AddUserForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(addUser);
  const [role, setRole] = React.useState("Admin");
  const selectRoleHandler = (event) => {
    setRole(event.target.value);
  };
  const [name, setName] = React.useState("");
  const selectNameHandler = (event) => {
    setName(event.target.value);
  };
  const [email, setEmail] = React.useState("");
  const selectEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState("");
  const selectPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const addUserSubmitHandler = (event) => {
    event.preventDefault();
    let request = {
      hoTen: name,
      email: email,
      password: password,
      maNhom: roles.findIndex((x) => x === role) + 1,
    };
    // console.log(request);
    sendRequest(request);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();

        swal(
          "Thêm thành công!",
          "Bạn đã thêm người dùng mới thành công",
          "success"
        );
        props.addUser({ ...data });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {status === "pending" && <LinearLoading />}
      <form onSubmit={addUserSubmitHandler}>
        <DialogTitle>Thêm người dùng</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Họ tên"
              value={name}
              onChange={selectNameHandler}
              type="text"
              variant="outlined"
            />
            <TextField
              margin="dense"
              required
              id="email"
              label="Email"
              value={email}
              onChange={selectEmailHandler}
              type="email"
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="password"
              required
              value={password}
              onChange={selectPasswordHandler}
              label="Mật khẩu"
              type="password"
              variant="outlined"
            />
            <TextField
              id="role"
              required
              select
              margin="dense"
              value={role}
              onChange={selectRoleHandler}
              label="Vai trò"
            >
              {roles.map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option}`}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === "pending"}
            variant="contained"
            type="submit"
          >
            {status === "pending" ? "Đang thêm..." : "Thêm"}
          </Button>
          <Button onClick={props.onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserForm;
