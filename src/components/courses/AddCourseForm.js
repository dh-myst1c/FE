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
import { addCourse } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";
const grades = [10, 11, 12];
const AddCourseForm = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <AddCourseContent
        subjects={props.subjects}
        onClose={props.onClose}
        addCourse={props.addCourse}
      />
    </Dialog>
  );
};

export const AddCourseContent = (props) => {
  const { sendRequest, status, data, error } = useHttp(addCourse);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      if (data) {
        swal(
          "Thêm thành công!",
          "Bạn đã thêm chương trình học mới thành công",
          "success"
        );
        props.addCourse({ ...data, id: data.maCTH });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const [subject, setSubject] = React.useState("");
  const selectSubjectHandler = (event) => {
    console.log(event.target);
    setSubject(event.target.value);
  };
  const [grade, setGrade] = React.useState(10);
  const selectGradeHandler = (event) => {
    setGrade(event.target.value);
  };
  const [heSo, setHeSo] = React.useState(1);
  const heSoChangeHandler = (event) => {
    setHeSo(event.target.value);
  };
  const addCourseSubmitHandler = (event) => {
    event.preventDefault();
    let request = {
      maMH: subject.maMH,
      maKhoi: grade - 9,
      heSo: heSo,
    };
    sendRequest(request);
  };
  return (
    <form onSubmit={addCourseSubmitHandler}>
      {status === "pending" && <LinearLoading />}
      <DialogTitle>Thêm chương trình học</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "300px" }}>
          <TextField
            required
            autoFocus
            id="subject"
            select
            margin="dense"
            label="Môn học"
            value={subject}
            onChange={selectSubjectHandler}
          >
            {props.subjects.map((option) => (
              <MenuItem key={option.maMH} value={option}>
                {`${option.tenMH}`}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
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
          {status === "pending" ? "Đang thêm..." : "Thêm"}
        </Button>
        <Button onClick={props.onClose}>Hủy bỏ</Button>
      </DialogActions>
    </form>
  );
};

export default AddCourseForm;
