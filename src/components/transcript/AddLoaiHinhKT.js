import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
const AddLoaiHinhKT = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Thêm loại hình kiểm tra</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ width: "250px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Tên loại hình"
            type="text"
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="point"
            label="Hệ số điểm"
            type="number"
            variant="outlined"
          />
           <TextField
            margin="dense"
            id="point"
            label="Thời gian kiểm tra"
            type="text"
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={props.onClose}>
          Thêm
        </Button>
        <Button onClick={props.onClose}>Hủy bỏ</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLoaiHinhKT;
