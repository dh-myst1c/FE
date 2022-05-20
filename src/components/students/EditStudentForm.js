import React from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import useHttp from "../../hooks/use-http";
import { editStudent } from "../../lib/api";
import DatePicker from "@mui/lab/DatePicker";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const EditStudentForm = (props) => {
  const { control, handleSubmit } = useForm();
  const { sendRequest, status, error, data } = useHttp(editStudent);
  const submitFormHandler = (data) => {
    let request = { ...props.editStudent, ...data };
    console.log(request);
    sendRequest(request);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();

        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật thông tin học sinh thành công",
          "success"
        );
        props.updateStudent({ ...data, id: data.maHS });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {status === "pending" && <LinearLoading />}

      <form onSubmit={handleSubmit(submitFormHandler)}>
        <DialogTitle>Cập nhật thông tin học sinh</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <Controller
              name="hoTen"
              control={control}
              defaultValue={props.editStudent.hoTen}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Họ tên"
                  required
                  fullWidth
                  id="name-input"
                  variant="outlined"
                />
              )}
            ></Controller>

            <Controller
              name="gioiTinh"
              control={control}
              defaultValue={props.editStudent.gioiTinh}
              render={({ field }) => (
                <FormControl {...field} component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    defaultValue={props.editStudent.gioiTinh}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Nam"
                      control={<Radio />}
                      label="Nam"
                    />
                    <FormControlLabel
                      value="Nữ"
                      control={<Radio />}
                      label="Nữ"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            ></Controller>

            <Controller
              name="ngaySinh"
              control={control}
              defaultValue={props.editStudent.ngaySinh}
              render={({ field }) => (
                <BasicDatePicker
                  initVal={props.editStudent.ngaySinh}
                  {...field}
                />
              )}
            ></Controller>

            <Controller
              name="diaChi"
              control={control}
              defaultValue={props.editStudent.diaChi}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  id="address-input"
                  variant="outlined"
                />
              )}
            ></Controller>
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
const BasicDatePicker = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState(moment(props.initVal, "DD/MM/YYYY"));
  const setNewValueHandler = (newValue) => {
    console.log(newValue);
    props.onChange(newValue.format("DD/MM/yyyy"));
    setValue(newValue);
  };
  return (
    <DatePicker
      inputFormat="DD/MM/yyyy"
      value={value}
      onChange={setNewValueHandler}
      renderInput={(params) => <TextField {...params} />}
    />
  );
});
export default EditStudentForm;
