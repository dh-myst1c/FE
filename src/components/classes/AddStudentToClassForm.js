import React, { useEffect } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import useHttp from "../../hooks/use-http";
import { getStudentsEmpty, addStudentsToClass } from "../../lib/api";
import BackdropLoading from "../UI/BackdropLoading";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const AddStudentToClassForm = (props) => {
  const { sendRequest, status, error, data } = useHttp(getStudentsEmpty, true);
  useEffect(() => {
    sendRequest(props.maHK);
  }, [sendRequest, props.maHK]);
  if (status === "pending") return <BackdropLoading />;
  if (error) return <p>{error}</p>;
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <AddStudentToClassContent
        maHK={props.maHK}
        maLop={props.maLop}
        data={data}
        onClose={props.onClose}
        addStudents={props.addStudents}
      />
    </Dialog>
  );
};

const AddStudentToClassContent = (props) => {
  const { sendRequest, status, error, data } = useHttp(addStudentsToClass);

  useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "Thêm thành công!",
          "Bạn đã thêm học sinh vào lớp thành công",
          "success"
        );
        const addedData = [...data].map((x) => {
          return { ...x, id: x.maHS };
        });
        props.addStudents(addedData);
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const [addedStudents, setAddedStudents] = React.useState([]);
  const changeSelectedStudentHandler = (event, value) => {
    setAddedStudents(value);
  };
  const addStudentToClassHandler = (event) => {
    event.preventDefault();
    let request = {
      maHS: addedStudents.map((item) => item.maHS),
      maHK: props.maHK,
      maLop: props.maLop,
    };
    sendRequest(request);
  };
  return (
    <form onSubmit={addStudentToClassHandler}>
      {status === "pending" && <LinearLoading />}
      <DialogTitle>Thêm học sinh vào lớp</DialogTitle>
      <DialogContent>
        <Autocomplete
          sx={{ padding: "8px 0" }}
          onChange={changeSelectedStudentHandler}
          value={addedStudents}
          multiple
          id="students"
          options={props.data}
          disableCloseOnSelect
          getOptionLabel={(option) => option.hoTen}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={option.id}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {`${option.hoTen} (${option.id})`}
            </li>
          )}
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Danh sách học sinh"
              placeholder="Học sinh"
            />
          )}
        />
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
  );
};

export default AddStudentToClassForm;
