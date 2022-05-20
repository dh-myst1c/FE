import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Box";
import Button from "@mui/material/Button";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { delCourses } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const useStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within":
      {
        outline: "none",
      },
  },
});

const CoursesTable = (props) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedList, setSelectedList] = React.useState([]);

  const [listCTH, setListCTH] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteOneCourseHandler = (id) => {
    setListCTH([id]);
    handleClickOpen();
  };
  const deleteCoursesHandler = () => {
    handleClickOpen();
  };
  const columns = [
    { field: "id", headerName: "Mã chương trình học", width: 150 },
    { field: "tenMH", headerName: "Môn học", width: 150 },
    { field: "tenKhoi", headerName: "Khối", width: 150 },
    { field: "heSo", headerName: "Hệ số", width: 150 },
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
            title="Xóa chương trình học"
            variant="dark"
            onClick={deleteOneCourseHandler.bind(null, params.id)}
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
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
          <Button
            onClick={deleteCoursesHandler}
            variant="contained"
            color="error"
          >
            Xóa tất cả
          </Button>
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
        className={`${classes.root} mh-500 bt-none`}
        disableCellFocusOutline
        // className=""
        hideFooterSelectedRowCount
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSelectionModelChange={(params) => {
          setSelectedList(params);
          setListCTH(params);
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
          listCTH={listCTH}
          onClose={handleClose}
          delCourses={props.delCourses}
        />
      )}
    </div>
  );
};
function AlertDialog(props) {
  const { sendRequest, status, data, error } = useHttp(delCourses);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "Xóa thành công!",
          "Bạn đã xóa chương trình học thành công",
          "success"
        );
        props.delCourses(props.listCTH);
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const deleteStudentsFromClassHandler = (event) => {
    event.preventDefault();
    let request = {
      maCTH: props.listCTH,
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
              Bạn có muốn xóa những chương trình này không?
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
export default CoursesTable;
