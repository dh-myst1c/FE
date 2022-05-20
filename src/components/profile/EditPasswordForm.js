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
import { editPassword } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";

const EditPasswordForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(editPassword);

  const [matKhauCu, setMatKhauCu] = React.useState("");
  const matKhauCuChangeHandler = (event) => {
    setMatKhauCu(event.target.value);
  };
  const [matKhauMoi, setMatKhauMoi] = React.useState("");
  const matKhauMoiChangeHandler = (event) => {
    setMatKhauMoi(event.target.value);
  };
  const [matKhauNhapLai, setMatKhauNhapLai] = React.useState("");
  const matKhauNhapLaiChangeHandler = (event) => {
    setMatKhauNhapLai(event.target.value);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();
        swal(
          "Cập nhật thành công!",
          "Bạn đã thay đổi mật khẩu thành công",
          "success"
        );
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);

  const editPasswordSubmitHandler = (event) => {
    event.preventDefault();
    if (matKhauMoi !== matKhauNhapLai) {
      swal("Lỗi", "Mật khẩu mới nhập lại không khớp", "error");
      return;
    }
    let request = {
      matKhauCu,
      matKhauMoi,
      id: props.editUser.id,
    };
    // console.log(request);
    sendRequest(request);
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={editPasswordSubmitHandler}>
        {status === "pending" && <LinearLoading />}
        <DialogTitle>Thay đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              required
              autoFocus
              value={matKhauCu}
              margin="dense"
              id="oldPass"
              label="Mật khẩu cũ"
              type="password"
              variant="outlined"
              onChange={matKhauCuChangeHandler}
            />
            <TextField
              required
              value={matKhauMoi}
              margin="dense"
              id="newPass"
              label="Mật khẩu mới"
              type="password"
              variant="outlined"
              onChange={matKhauMoiChangeHandler}
            />
            <TextField
              required
              value={matKhauNhapLai}
              margin="dense"
              id="retypePass"
              label="Nhập lại mật khẩu mới"
              type="password"
              variant="outlined"
              onChange={matKhauNhapLaiChangeHandler}
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

export default EditPasswordForm;
