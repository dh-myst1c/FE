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
import { addSubject } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";
const AddSubjectForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(addSubject);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "Thêm thành công!",
          "Bạn đã thêm môn học mới thành công",
          "success"
        );
        props.addSubject({ ...data, id: data.maMH });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const addSubjectHandler = (event) => {
    event.preventDefault();
    let request = {
      tenMH: enteredSubjectName,
      diemDat: enteredGrade,
    };
    sendRequest(request);
  };
  const [enteredSubjectName, setEnteredSubjectName] = React.useState("");
  const [enteredGrade, setEnteredGrade] = React.useState("");

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={addSubjectHandler}>
        {status === "pending" && <LinearLoading />}
        <DialogTitle>Thêm môn học</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "200px" }}>
            <TextField
              required
              value={enteredSubjectName}
              onChange={(event) => {
                setEnteredSubjectName(event.target.value);
              }}
              autoFocus
              margin="dense"
              id="subject"
              label="Tên môn học"
              type="text"
              variant="outlined"
            />
            <TextField
              required
              value={enteredGrade}
              onChange={(event) => {
                setEnteredGrade(event.target.value);
              }}
              margin="dense"
              id="point"
              label="Điểm đạt"
              type="number"
              variant="outlined"
            />
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

export default AddSubjectForm;
