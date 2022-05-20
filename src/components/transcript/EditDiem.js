import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import swal from "sweetalert";
import useHttp from "../../hooks/use-http";
import { editTranscript } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";
const toArrayNum = (str) => {
  if (str === "") return [];
  return str
    .trim()
    .split(" ")
    .map((x) => +x);
};

const isValidScoreArray = (str) => {
  str = str.trim();
  if (str === "") return true;
  const arr = str.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (isNaN(parseFloat(arr[i]))) return false;
    else {
      if (parseFloat(arr[i]) > 10 || parseFloat(arr[i]) < 0) return false;
    }
  }
  return true;
};
const EditDiem = (props) => {
  const { sendRequest, status, data, error } = useHttp(editTranscript);
  const [diemMieng, setDiemMieng] = React.useState(
    props.editTranscript.diemMieng
  );
  const [diem15P, setDiem15P] = React.useState(props.editTranscript.diem15P);
  const [diem1Tiet, setDiem1Tiet] = React.useState(
    props.editTranscript.diem1Tiet
  );
  const [diemHK, setDiemHK] = React.useState(props.editTranscript.diemHK);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      if (data) {
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật bảng điểm thành công",
          "success"
        );
        props.updateTranscript({
          ...props.editTranscript,
          id: props.editTranscript.maHS,
          diemMieng: diemMieng,
          diem15P: diem15P,
          diem1Tiet: diem1Tiet,
          diemHK: diemHK,
          maBD: data.maBD,
          diemTBM: data.diemTBM,
        });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props, diemMieng, diem15P, diem1Tiet, diemHK]);
  const editTranscriptSubmitHandler = (event) => {
    event.preventDefault();
    if (!isValidScoreArray(diemMieng)) {
      swal("Sai định dạng!", "Bạn đã nhập sai định dạng điểm miệng", "error");
      return;
    }
    if (!isValidScoreArray(diem15P)) {
      swal("Sai định dạng!", "Bạn đã nhập sai định dạng điểm 15 phút", "error");
      return;
    }
    if (!isValidScoreArray(diem1Tiet)) {
      swal("Sai định dạng!", "Bạn đã nhập sai định dạng điểm 1 tiết", "error");
      return;
    }
    if (!isValidScoreArray(diemHK)) {
      swal("Sai định dạng!", "Bạn đã nhập sai định dạng điểm học kỳ", "error");
      return;
    }
    console.log({
      diem15P: toArrayNum(diem15P),
      diemMieng: toArrayNum(diemMieng),
      diemHK: toArrayNum(diemHK),
      diem1Tiet: toArrayNum(diem1Tiet),
      maBD: props.editTranscript.maBD,
      maQTH: props.editTranscript.maQTH,
      maMH: props.editTranscript.maMH,
    });
    sendRequest({
      diem15P: toArrayNum(diem15P),
      diemMieng: toArrayNum(diemMieng),
      diemHK: toArrayNum(diemHK),
      diem1Tiet: toArrayNum(diem1Tiet),
      maBD: props.editTranscript.maBD,
      maQTH: props.editTranscript.maQTH,
      maMH: props.editTranscript.maMH,
    });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {status === "pending" && <LinearLoading />}
      <form onSubmit={editTranscriptSubmitHandler}>
        <Box
          margin="10px 25px 0px 22px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" component="h6" fontSize="30px">
            Sửa điểm
          </Typography>{" "}
          <Typography variant="h6" component="h6" fontSize="20px">
            Môn: {props.editTranscript.tenMH}
          </Typography>
        </Box>

        <DialogContent>
          <Stack spacing={2} sx={{ width: "350px" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" component="h1" fontSize="15px">
                ( MaHS: {props.editTranscript.maHS}){" "}
                {props.editTranscript.hoTen}
              </Typography>
              <Typography variant="h6" component="h1" fontSize="15px">
                Lớp: {props.editTranscript.tenLop}
              </Typography>
            </Box>

            <TextField
              autoFocus
              margin="dense"
              id="diemmieng"
              label="Điểm miệng"
              type="text"
              variant="outlined"
              onChange={(event) => {
                setDiemMieng(event.target.value);
              }}
              value={diemMieng}
            />
            <TextField
              margin="dense"
              id="diem15p"
              label="Điểm 15p"
              type="text"
              variant="outlined"
              onChange={(event) => {
                setDiem15P(event.target.value);
              }}
              value={diem15P}
            />
            <TextField
              margin="dense"
              id="diem1tiet"
              label="Điểm 1 tiết"
              type="text"
              variant="outlined"
              onChange={(event) => {
                setDiem1Tiet(event.target.value);
              }}
              value={diem1Tiet}
            />
            <TextField
              margin="dense"
              id="diemhocky"
              label="Điểm học kỳ"
              type="text"
              variant="outlined"
              onChange={(event) => {
                setDiemHK(event.target.value);
              }}
              value={diemHK}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="submit"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Đang lưu..." : "Xác nhận"}
          </Button>
          <Button onClick={props.onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditDiem;
