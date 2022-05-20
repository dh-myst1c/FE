import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import swal from "sweetalert";
import useHttp from "../../hooks/use-http";
import { editProfile } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";

const EditProfileForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(editProfile);

  const [hoTen, setHoTen] = React.useState(props.editProfile.name);
  const hoTenChangeHandler = (event) => {
    setHoTen(event.target.value);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật thông tin cá nhân thành công",
          "success"
        );
        props.onReload();
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props, hoTen]);

  const editProfileSubmitHandler = (event) => {
    event.preventDefault();
    let request = {
      hoTen: hoTen,
      id: props.editProfile.id,
    };
    sendRequest(request);
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={editProfileSubmitHandler}>
        {status === "pending" && <LinearLoading />}
        <DialogTitle>Cập nhật thông tin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              required
              autoFocus
              value={hoTen}
              margin="dense"
              id="name"
              label="Họ tên"
              type="text"
              variant="outlined"
              onChange={hoTenChangeHandler}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === "pending"}
            type="submit"
            variant="contained"
          >
            {status === "pending" ? "Đang lưu..." : "Xác nhận"}
          </Button>
          <Button onClick={props.onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditProfileForm;
