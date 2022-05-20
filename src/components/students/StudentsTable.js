import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouteMatch, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { delStudents } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";

const StudentsTable = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const moveToProfileHandler = (id) => {
    history.push(`${url}/profile/${id}`);
  };
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedList, setSelectedList] = React.useState([]);
  const [listHS, setListHS] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteOneStudentHandler = (id) => {
    setListHS([id]);
    handleClickOpen();
  };
  const deleteStudentsHandler = () => {
    handleClickOpen();
  };
  const columns = [
    { field: "id", headerName: "Mã HS", width: 150 },
    { field: "hoTen", headerName: "Họ tên", width: 150 },
    { field: "gioiTinh", headerName: "Giới tính", sortable: false, width: 150 },
    { field: "ngaySinh", headerName: "Ngày sinh", sortable: false, width: 150 },
    { field: "diaChi", headerName: "Địa chỉ", width: 150 },
    {
      field: "action",
      headerName: "Hành động",
      headerAlign: "center",
      sortable: false,
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            title="Sửa"
            variant="dark"
            onClick={props.onShowEdit.bind(null, params.row)}
          >
            <EditOutlined />
          </IconButton>
          <IconButton
            title="Xóa khỏi lớp"
            variant="dark"
            onClick={deleteOneStudentHandler.bind(null, params.id)}
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "profile",
      headerName: "Học bạ",
      headerAlign: "center",
      sortable: false,
      align: "center",
      width: 150,
      renderCell: (params) => (
        <Button
          sx={{ textTransform: "none" }}
          size="small"
          color="secondary"
          variant="contained"
          onClick={moveToProfileHandler.bind(null, params.id)}
        >
          Học bạ
        </Button>
      ),
    },
  ];
  return (
    <div style={{ height: "auto", minHeight: "500px", width: "100%" }}>
      {selectedList.length > 0 && (
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(3, 201, 215, 0.08)",
          }}
        >
          <Typography variant="subtitle1">
            Đã chọn {selectedList.length}
          </Typography>
          <IconButton
            title="Xóa"
            variant="dark"
            onClick={deleteStudentsHandler}
          >
            <DeleteOutlined />
          </IconButton>
        </Toolbar>
      )}
      {selectedList.length === 0 && <Toolbar></Toolbar>}
      <DataGrid
        localeText={{
          toolbarExport: "Xuất",
          toolbarExportLabel: "Xuất",
          toolbarExportCSV: "Tải về dạng CSV",
          toolbarExportPrint: "In",
          noRowsLabel: "Không có dữ liệu",
        }}
        className="mh-500 bt-none"
        hideFooterSelectedRowCount
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSelectionModelChange={(params) => {
          setSelectedList(params);
          setListHS(params);
        }}
        pagination
        disableColumnMenu
        disableSelectionOnClick
        checkboxSelection
        rows={props.data}
        rowsPerPageOptions={[5, 10, 20]}
        columns={columns}
      />
      {open && (
        <AlertDialog
          listHS={listHS}
          onClose={handleClose}
          delStudents={props.delStudents}
        />
      )}
    </div>
  );
};
function AlertDialog(props) {
  const { sendRequest, status, data, error } = useHttp(delStudents);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal("Xóa thành công!", "Bạn đã xóa học sinh thành công", "success");
        props.delStudents(props.listHS);
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const deleteStudentsFromClassHandler = (event) => {
    event.preventDefault();
    let request = {
      maHS: props.listHS,
      maLop: props.maLop,
      maHK: props.maHK,
    };
    sendRequest(request);
  };
  return (
    <div>
      <Dialog
        open={true}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={deleteStudentsFromClassHandler}>
          {status === "pending" && <LinearLoading />}
          <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có muốn xóa những học sinh này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === "pending"}
              variant="contained"
              type="submit"
              autoFocus
            >
              {status === "pending" ? "Đang xóa..." : "Xác nhận"}
            </Button>
            <Button onClick={props.onClose}>Hủy</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
export default StudentsTable;
