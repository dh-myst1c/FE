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
import { editCourse } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";
const grades = [10, 11, 12];
const EditCourseForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(editCourse);
  const [subject, setSubject] = React.useState(props.editCourse.tenMH);
  const selectSubjectHandler = (event) => {
    setSubject(event.target.value);
  };
  const [grade, setGrade] = React.useState(props.editCourse.maKhoi + 9);
  const selectGradeHandler = (event) => {
    setGrade(event.target.value);
  };
  const [heSo, setHeSo] = React.useState(props.editCourse.heSo);
  const heSoChangeHandler = (event) => {
    setHeSo(event.target.value);
  };
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      if (data) {
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật chương trình học thành công",
          "success"
        );
        props.updateCourse({
          ...props.editCourse,
          heSo: heSo,
          id: props.editCourse.maCTH,
        });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props, heSo]);

  const editCourseSubmitHandler = (event) => {
    event.preventDefault();
    let request = {
      maCTH: props.editCourse.maCTH,
      maKhoi: grade - 9,
      maMH: props.editCourse.maMH,
      heSo: heSo,
    };
    sendRequest(request);
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={editCourseSubmitHandler}>
        {status === "pending" && <LinearLoading />}
        <DialogTitle>Sửa chương trình học</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              disabled
              autoFocus
              id="subject"
              select
              margin="dense"
              label="Môn học"
              value={subject}
              onChange={selectSubjectHandler}
            >
              {props.subjects.map((option) => (
                <MenuItem key={option.maMH} value={option.tenMH}>
                  {`${option.tenMH}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              disabled
              id="grade"
              select
              margin="dense"
              label="Khối"
              value={grade}
              onChange={selectGradeHandler}
            >
              {grades.map((option) => (
                <MenuItem key={option} value={option}>
                  {`${option}`}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              value={heSo}
              margin="dense"
              id="coefficient"
              label="Hệ số"
              type="number"
              variant="outlined"
              onChange={heSoChangeHandler}
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

export default EditCourseForm;
