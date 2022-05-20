import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlined, EditOutlined, Restore } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { deleteUsers, resetPassword } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
const roles = ["Admin", "Hiệu trưởng", "Giáo vụ"];

const useStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus-within, &.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within":
      {
        outline: "none",
      },
  },
});
const UsersTable = (props) => {
  const classes = useStyles();
  const [pageSize, setPageSize] = React.useState(5);
  const [maNguoiDung, setMaNguoiDung] = React.useState();

  const [selectedList, setSelectedList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openReset, setOpenReset] = React.useState(false);

  const [listUser, setListUser] = React.useState([]);

  const deleteUsersHandler = () => {
    handleClickOpen();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenReset = () => {
    setOpenReset(true);
  };

  const handleCloseReset = () => {
    setOpenReset(false);
  };
  const deleteOneUserHandler = (id) => {
    setListUser([id]);
    handleClickOpen();
  };

  const columns = [
    { field: "id", headerName: "Mã người dùng", width: 150 },
    { field: "name", headerName: "Họ tên", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "maNhom",
      valueGetter: (params) => roles[params.row.maNhom - 1],
      headerName: "Vai trò",
      width: 150,
    },

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
            <EditOutlined color="primary" />
          </IconButton>
          <IconButton
            title="Khôi phục"
            variant="dark"
            onClick={() => {
              setMaNguoiDung(params.id);
              handleClickOpenReset(true);
            }}
          >
            <Restore color="success" />
          </IconButton>
          <IconButton
            title="Xóa"
            variant="dark"
            onClick={deleteOneUserHandler.bind(null, params.id)}
          >
            <DeleteOutlined color="action" />
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
            onClick={deleteUsersHandler}
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
        // className=""
        hideFooterSelectedRowCount
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        onSelectionModelChange={(params) => {
          setSelectedList(params);
          setListUser(params);
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
          listUser={listUser}
          onClose={handleClose}
          delUsers={props.delUsers}
        />
      )}
      {openReset && (
        <AlertDialogReset
          maNguoiDung={maNguoiDung}
          onClose={handleCloseReset}
          delUsers={props.delUsers}
        />
      )}
    </div>
  );
};
function AlertDialog(props) {
  const { sendRequest, status, data, error } = useHttp(deleteUsers);
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();
        console.log(data);
        swal("Xóa thành công!", "Bạn đã xóa người dùng thành công", "success");
        props.delUsers(props.listUser);
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const deleteUsersSubmitHandler = (event) => {
    event.preventDefault();
    let request = {
      id: props.listUser,
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
        <form onSubmit={deleteUsersSubmitHandler}>
          {status === "pending" && <LinearLoading />}
          <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có muốn xóa những người dùng này không?
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
function AlertDialogReset(props) {
  const { sendRequest, status, data, error } = useHttp(resetPassword);
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        props.onClose();
        console.log(data);
        swal(
          "Khôi phục thành công!",
          "Bạn đã khôi phục mật khẩu người dùng thành công",
          "success"
        );
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);
  const resetPasswordSubmitHandler = (event) => {
    event.preventDefault();

    sendRequest(props.maNguoiDung);
  };
  return (
    <div>
      <Dialog
        open={true}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={resetPasswordSubmitHandler}>
          {status === "pending" && <LinearLoading />}
          <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có khôi phục mật khẩu cho người dùng này không?
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
export default UsersTable;
