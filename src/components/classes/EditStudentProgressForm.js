import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import useHttp from "../../hooks/use-http";
import { editStudentOfClass } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";
const hanhKiems = ["Tốt", "Khá", "Trung bình", "Yếu"];
const tinhTrangs = ["Đã đóng", "Chưa đóng"];
const EditStudentProgressForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(editStudentOfClass);
  console.log(props.editData);
  const [hocPhi, setHocPhi] = React.useState(props.editData.tinhTrangHocPhi);
  const selectHocPhiHandler = (event) => {
    setHocPhi(event.target.value);
  };
  const [baoHiem, setBaoHiem] = React.useState(props.editData.tinhTrangBaoHiem);
  const selectBaoHiemHandler = (event) => {
    setBaoHiem(event.target.value);
  };
  const [hanhKiem, setHanhKiem] = React.useState(props.editData.hanhKiem);
  const selectHanhKiemHandler = (event) => {
    setHanhKiem(event.target.value);
  };
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật tình trạng học sinh thành công!",
          "success"
        );
        props.updateStudent({
          ...props.editData,
          tinhTrangHocPhi: hocPhi,
          tinhTrangBaoHiem: baoHiem,
          hanhKiem: hanhKiem,
        });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props, hocPhi, baoHiem, hanhKiem]);
  const editStudentProgressSubmitHandler = (event) => {
    event.preventDefault();
    sendRequest({
      tinhTrangHocPhi: hocPhi,
      tinhTrangBaoHiem: baoHiem,
      hanhKiem: hanhKiem,
      maQTH: props.editData.maQTH,
    });
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={editStudentProgressSubmitHandler}>
        {status === "pending" && <LinearLoading />}
        <DialogTitle>Thay đổi thông tin quá trình học</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              autoFocus
              id="hocPhi"
              select
              margin="dense"
              label="Tình trạng học phí"
              value={hocPhi}
              onChange={selectHocPhiHandler}
            >
              {tinhTrangs.map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="baoHiem"
              select
              margin="dense"
              label="Tình trạng bảo hiểm"
              value={baoHiem}
              onChange={selectBaoHiemHandler}
            >
              {tinhTrangs.map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="hanhKiem"
              select
              margin="dense"
              label="Hạnh kiểm"
              value={hanhKiem}
              onChange={selectHanhKiemHandler}
            >
              {hanhKiems.map((option) => (
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
            {status === "pending" ? "Đang lưu..." : "Xác nhận"}
          </Button>
          <Button onClick={props.onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditStudentProgressForm;
