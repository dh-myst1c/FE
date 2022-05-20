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
import { editUser } from "../../lib/api";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const roles = ["Admin", "Hiệu trưởng", "Giáo vụ"];
const EditUserForm = (props) => {
  const [role, setRole] = React.useState(roles[props.editUser.maNhom - 1]);
  const selectRoleHandler = (event) => {
    setRole(event.target.value);
  };
  const [name, setName] = React.useState(props.editUser.name);
  const selectNameHandler = (event) => {
    setName(event.target.value);
  };
  const [email, setEmail] = React.useState(props.editUser.email);
  const selectEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const { sendRequest, status, error, data } = useHttp(editUser);
  const editUserSubmitHandler = (event) => {
    event.preventDefault();
    let request = {
      id: props.editUser.id,
      hoTen: name,
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
          "Cập nhật thành công!",
          "Bạn đã cập nhật thông tin người dùng thành công",
          "success"
        );
        props.updateUser({ ...data });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {status === "pending" && <LinearLoading />}

      <form onSubmit={editUserSubmitHandler}>
        <DialogTitle>Cập nhật người dùng</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              disabled
              margin="dense"
              id="email"
              label="Email"
              value={email}
              onChange={selectEmailHandler}
              type="email"
              variant="outlined"
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              label="Tên"
              value={name}
              onChange={selectNameHandler}
              type="text"
              variant="outlined"
            />

            <TextField
              id="role"
              required
              select
              margin="dense"
              label="Vai trò"
              value={role}
              onChange={selectRoleHandler}
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
            type="submit"
            variant="contained"
          >
            {status === "pending" ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
          <Button onClick={props.onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserForm;
