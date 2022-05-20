import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import useHttp from "../../hooks/use-http";
import { addStudent } from "../../lib/api";

import DatePicker from "@mui/lab/DatePicker";
import { useForm, Controller } from "react-hook-form";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const AddStudentForm = (props) => {
  const { sendRequest, status, data, error } = useHttp(addStudent);

  const { control, handleSubmit } = useForm();
  const submitFormHandler = (data) => {
    sendRequest(data);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();

        swal(
          "Thêm thành công!",
          "Bạn đã thêm  học sinh mới thành công",
          "success"
        );
        props.addStudent({ ...data, id: data.maHS });
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <form onSubmit={handleSubmit(submitFormHandler)}>
        {status === "pending" && <LinearLoading />}
        <DialogTitle>Thêm học sinh</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <Controller
              name="hoTen"
              control={control}
              defaultValue=""
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
              defaultValue="Nam"
              render={({ field }) => (
                <FormControl {...field} component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    defaultValue="Nam"
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
              margin="dense"
              label="Ngày sinh"
              control={control}
              defaultValue=""
              render={({ field }) => <BasicDatePicker {...field} />}
            ></Controller>

            <Controller
              name="diaChi"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="Địa chỉ"
                  margin="dense"
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
            {status === "pending" ? "Đang thêm..." : "Thêm"}
          </Button>
          <Button onClick={props.onClose}>Hủy bỏ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
const BasicDatePicker = React.forwardRef((props, ref) => {
  const [value, setValue] = React.useState(null);
  const setNewValueHandler = (newValue) => {
    props.onChange(newValue.format("DD/MM/yyyy"));
    setValue(newValue);
  };
  return (
    <DatePicker
      inputFormat="DD/MM/yyyy"
      label="Ngày sinh"
      value={value}
      onChange={setNewValueHandler}
      renderInput={(params) => (
        <TextField margin="dense" required {...params} />
      )}
    />
  );
});
export default AddStudentForm;
