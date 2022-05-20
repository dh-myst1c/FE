import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
// import { IconButton } from "@mui/material";
// import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import useHttp from "../../hooks/use-http";
import { getTKHKByForegin, updateTKHKByForeign } from "../../lib/api";
import Loading from "../UI/Loading";
import swal from "sweetalert";
function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
        title="Xuất"
        csvOptions={{
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}
const BCHocKy = (props) => {
  const { sendRequest, status, data, error } = useHttp(getTKHKByForegin);
  const {
    sendRequest: sendRequestUpdate,
    status: statusUpdate,
    data: dataUpdate,
    error: errorUpdate,
  } = useHttp(updateTKHKByForeign);
  const [tongKetHK, setTongKetHK] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "tenLop",
      headerName: "Lớp",
      width: 200,
      valueGetter: (params) => {
        return props.lop.find(
          (x) => params.row.maLop.toString() === x.maLop.toString()
        ).tenLop;
      },
    },
    { field: "siSo", headerName: "Sĩ số", width: 200 },
    { field: "soLuongDat", headerName: "Số lượng đạt", width: 200 },
    { field: "tiLe", headerName: "Tỉ lệ đạt", width: 200 },
    // { field: "ghiChu", headerName: "Ghi chú", width: 200 },
  ];

  const [semester, setSemester] = React.useState("");
  const [pageSize, setPageSize] = React.useState(15);
  React.useEffect(() => {
    if (semester !== "") sendRequest({ maHK: semester.maHK });
  }, [semester, sendRequest]);
  React.useEffect(() => {
    if (status === "completed" && data) {
      setTongKetHK(data);
    }
  }, [data, status]);
  const SemesterHandleChange = (event) => {
    setSemester(event.target.value);
  };
  React.useEffect(() => {
    if (statusUpdate === "completed") {
      if (dataUpdate) {
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật báo cáo thành công",
          "success"
        );

        setTongKetHK(
          dataUpdate.map((x) => {
            return { ...x, id: x.maTKHK };
          })
        );
      } else if (errorUpdate) swal("Đã có lỗi xảy ra", errorUpdate, "error");
    }
  }, [statusUpdate, dataUpdate, errorUpdate]);
  const updateBaoCaoHandler = () => {
    if (semester === "") {
      swal("Lỗi", "Vui lòng chọn đủ thông tin", "error");
      return;
    }
    sendRequestUpdate({ maHK: semester.maHK });
  };
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <Grid container rowSpacing={3}>
      <Grid container item sm={1} sx={{ alignItems: "center" }}>
        <Typography variant="h6" component="h6" sx={{ fontSize: "17px" }}>
          Lựa chọn:
        </Typography>
      </Grid>
      <Grid item sm={5}>
        <FormControl size="small" sx={{ minWidth: "250px" }}>
          <InputLabel id="idSelectClass">Học kỳ*</InputLabel>
          <Select
            labelId="selectSemester"
            id="idSelectSemester"
            value={semester}
            label="Học kì"
            onChange={SemesterHandleChange}
          >
            {props.hocKy.map((x) => (
              <MenuItem key={x.maHK} value={x}>
                {x.tenHK}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid container item sm={6} sx={{ justifyContent: "flex-end" }}>
        <Button
          onClick={updateBaoCaoHandler}
          variant="contained"
          color="primary"
        >
          Cập nhật
        </Button>
      </Grid>
      <Grid item sm={12}>
        <DataGrid
          components={{
            Toolbar: CustomToolbar,
          }}
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
          pagination
          disableColumnMenu
          disableSelectionOnClick
          rows={tongKetHK}
          rowsPerPageOptions={[5, 10, 20]}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
};

export default BCHocKy;
