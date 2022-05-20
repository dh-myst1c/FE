import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";

import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import { delStudentsFromClass } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import swal from "sweetalert";
import LinearLoading from "../UI/LinearLoading";
import EditStudentProgressForm from "./EditStudentProgressForm";
const StudentOfClassTable = (props) => {
  const [pageSize, setPageSize] = React.useState(5);
  const [selectedList, setSelectedList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [listHS, setListHS] = React.useState([]);
  const [editData, setEditData] = React.useState(null);

  const [
    isEditProgressStudentDialogVisible,
    setIsEditProgressStudentDialogVisible,
  ] = React.useState(false);
  const showEditProgressStudentHandler = () => {
    setIsEditProgressStudentDialogVisible(true);
  };
  const hideEditProgressStudentHandler = () => {
    setIsEditProgressStudentDialogVisible(false);
  };
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
    { field: "id", headerName: "Mã HS", width: 100 },

    { field: "hoTen", headerName: "Họ tên", width: 150 },
    {
      field: "gioiTinh",
      headerName: "Giới tính",
      sortable: false,
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ngaySinh",
      headerName: "Ngày sinh",
      sortable: false,
      width: 120,
    },
    {
      field: "tinhTrangHocPhi",
      headerAlign: "center",
      align: "center",
      headerName: "Học phí",
      renderCell: (params) => {
        return (
          <Chip
            sx={
              params.row.tinhTrangHocPhi === "Đã đóng" ? { color: "#fff" } : {}
            }
            label={params.row.tinhTrangHocPhi}
            color={
              params.row.tinhTrangHocPhi === "Đã đóng" ? "success" : "error"
            }
            variant={
              params.row.tinhTrangHocPhi === "Đã đóng"
                ? "contained"
                : "outlined"
            }
          />
        );
      },
      sortable: false,
      width: 110,
    },

    {
      field: "tinhTrangBaoHiem",
      headerAlign: "center",
      align: "center",
      headerName: "Bảo hiểm",
      renderCell: (params) => {
        return (
          <Chip
            sx={
              params.row.tinhTrangBaoHiem === "Đã đóng" ? { color: "#fff" } : {}
            }
            label={params.row.tinhTrangBaoHiem}
            color={
              params.row.tinhTrangBaoHiem === "Đã đóng" ? "success" : "error"
            }
            variant={
              params.row.tinhTrangBaoHiem === "Đã đóng"
                ? "contained"
                : "outlined"
            }
          />
        );
      },
      sortable: false,
      width: 110,
    },
    {
      field: "hanhKiem",
      headerAlign: "center",
      align: "center",
      headerName: "Hạnh kiểm",
      renderCell: (params) => {
        let color;
        if (params.row.hanhKiem === "Tốt") {
          color = "success";
        } else if (params.row.hanhKiem === "Khá") {
          color = "warning";
        } else if (params.row.hanhKiem === "Trung bình") {
          color = "secondary";
        } else if (params.row.hanhKiem === "Yếu") {
          color = "error";
        }
        return (
          <Chip
            sx={{ color: "#fff" }}
            label={params.row.hanhKiem}
            color={color}
            variant="contained"
          />
        );
      },
      sortable: false,
      width: 120,
    },
    {
      field: "diemTB",
      valueGetter: (params) => {
        return params.row.diemTB === -1 ? "Chưa tính" : params.row.diemTB;
      },
      headerName: "Điểm TB",
      width: 100,
      headerAlign: "center",
      align: "center",
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
            onClick={() => {
              setEditData({ ...params.row });
              showEditProgressStudentHandler();
            }}
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
            onClick={deleteStudentsHandler}
            variant="outlined"
            color="error"
          >
            Xóa tất cả
          </Button>
        </Toolbar>
      )}
      {selectedList.length === 0 && (
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "rgba(3, 201, 215, 0.08)",
          }}
        >
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="subtitle1">{`GVCN: ${
                props.tenGVCN || " Chưa phân bổ"
              }`}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                {`Lớp trưởng: ${props.tenLT || "Chưa phân bổ"}`}
              </Typography>
            </Grid>
          </Grid>

          <Button
            onClick={props.onShowEditCanBo}
            sx={{ minWidth: "120px" }}
            variant="outlined"
          >
            Chỉnh sửa
          </Button>
        </Toolbar>
      )}
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
          maHK={props.maHK}
          maLop={props.maLop}
          listHS={listHS}
          onClose={handleClose}
          delStudents={props.delStudents}
        />
      )}
      {isEditProgressStudentDialogVisible && (
        <EditStudentProgressForm
          onClose={hideEditProgressStudentHandler}
          editData={editData}
          open={isEditProgressStudentDialogVisible}
          updateStudent={props.updateStudent}
        />
      )}
    </div>
  );
};

function AlertDialog(props) {
  const { sendRequest, status, data, error } = useHttp(delStudentsFromClass);
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "Xóa thành công!",
          "Bạn đã xóa học sinh khỏi lớp thành công",
          "success"
        );
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
              Bạn có muốn xóa những học sinh này khỏi lớp không?
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

export default StudentOfClassTable;
