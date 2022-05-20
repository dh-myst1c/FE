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
import { delSubjects } from "../../lib/api";
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

const SubjectsTable = (props) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedList, setSelectedList] = React.useState([]);

  const [listMH, setListMH] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteOneSubjectHandler = (id) => {
    setListMH([id]);
    handleClickOpen();
  };
  const deleteSubjectsHandler = () => {
    handleClickOpen();
  };
  const columns = [
    { field: "id", headerName: "Mã môn học", width: 150 },
    { field: "tenMH", headerName: "Tên môn học", width: 150 },
    { field: "diemDat", headerName: "Điểm đạt", width: 150 },
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
            title="Xóa môn học"
            variant="dark"
            onClick={deleteOneSubjectHandler.bind(null, params.id)}
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
            onClick={deleteSubjectsHandler}
            variant="contained"
            color="error"
          >
            Xóa tất cả
          </Button>
        </Toolbar>
      )}
      {selectedList.length === 0 && <Toolbar></Toolbar>}
      <DataGrid
        className={`${classes.root} mh-500 bt-none`}
        disableCellFocusOutline
        localeText={{
          toolbarExport: "Xuất",
          toolbarExportLabel: "Xuất",
          toolbarExportCSV: "Tải về dạng CSV",
          toolbarExportPrint: "In",
          noRowsLabel: "Không có dữ liệu",
        }}
        hideFooterSelectedRowCount
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSelectionModelChange={(params) => {
          setSelectedList(params);
          setListMH(params);
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
          listMH={listMH}
          onClose={handleClose}
          delSubjects={props.delSubjects}
        />
      )}
    </div>
  );
};
function AlertDialog(props) {
  const { sendRequest, status, data, error } = useHttp(delSubjects);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal("Xóa thành công!", "Bạn đã xóa môn học thành công", "success");
        props.delSubjects(props.listMH);
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const deleteStudentsFromClassHandler = (event) => {
    event.preventDefault();
    let request = {
      maMH: props.listMH,
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
              Bạn có muốn xóa những môn học này không?
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
export default SubjectsTable;
