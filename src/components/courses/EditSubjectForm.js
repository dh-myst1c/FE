import React, { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import useHttp from "../../hooks/use-http";
import { editSubject } from "../../lib/api";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";

const EditSubjectForm = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <EditSubjectContent
        onClose={props.onClose}
        subject={props.editSubject}
        updateSubjects={props.updateSubjects}
      />
    </Dialog>
  );
};

const EditSubjectContent = (props) => {
  const { sendRequest, status, error, data } = useHttp(editSubject);
  const [enteredSubject, setEnteredSubject] = useState(props.subject.tenMH);
  const [enteredPoint, setEnteredPoint] = useState(props.subject.diemDat);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật môn học thành công!",
          "success"
        );
        props.updateSubjects({
          ...props.subject,
          tenMH: enteredSubject,
          diemDat: enteredPoint,
        });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props, enteredPoint, enteredSubject]);
  const editSubjectSubmitHandler = (event) => {
    event.preventDefault();
    console.log({
      maMH: props.subject.maMH,
      tenMH: enteredSubject,
      diemDat: enteredPoint,
    });
    sendRequest({
      maMH: props.subject.maMH,
      tenMH: enteredSubject,
      diemDat: enteredPoint,
    });
  };

  const subjectChangeHandler = (event) => {
    setEnteredSubject(event.target.value);
  };
  const pointChangeHandler = (event) => {
    setEnteredPoint(event.target.value);
  };
  return (
    <form onSubmit={editSubjectSubmitHandler}>
      {status === "pending" && <LinearLoading />}
      <DialogTitle>Cập nhật môn học</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "200px" }}>
          <TextField
            required
            value={enteredSubject}
            onChange={subjectChangeHandler}
            autoFocus
            margin="dense"
            id="tenMH"
            label="Tên môn học"
            type="text"
            variant="outlined"
          />
          <TextField
            required
            value={enteredPoint}
            onChange={pointChangeHandler}
            margin="dense"
            id="diemDat"
            label="Điểm đạt"
            type="number"
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          variant="contained"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
        <Button disabled={status === "pending"} onClick={props.onClose}>
          Hủy bỏ
        </Button>
      </DialogActions>
    </form>
  );
};

export default EditSubjectForm;
