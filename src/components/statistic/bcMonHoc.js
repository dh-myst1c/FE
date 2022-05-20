import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
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
import { getTKMByForegin, updateTKMByForeign } from "../../lib/api";
import Loading from "../UI/Loading";
import swal from "sweetalert";
import { Backdrop } from "@mui/material";

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
const BCMonHoc = (props) => {
  const { sendRequest, status, data, error } = useHttp(getTKMByForegin);
  const {
    sendRequest: sendRequestUpdate,
    status: statusUpdate,
    data: dataUpdate,
    error: errorUpdate,
  } = useHttp(updateTKMByForeign);

  const [subject, setSubject] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [pageSize, setPageSize] = React.useState(15);
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
  const [tongKetMons, setTongKetMons] = React.useState([]);
  React.useEffect(() => {
    if (subject !== "" && semester !== "")
      sendRequest({ maMH: subject.maMH, maHK: semester.maHK });
  }, [semester, sendRequest, subject]);
  React.useEffect(() => {
    if (status === "completed" && data) {
      setTongKetMons(data);
    }
  }, [data, status]);
  React.useEffect(() => {
    if (statusUpdate === "completed") {
      if (dataUpdate) {
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật báo cáo thành công",
          "success"
        );

        setTongKetMons(
          dataUpdate.map((x) => {
            return { ...x, id: x.maTKM };
          })
        );
      } else if (errorUpdate) swal("Đã có lỗi xảy ra", errorUpdate, "error");
    }
  }, [statusUpdate, dataUpdate, errorUpdate]);
  const SubjectHandleChange = (event) => {
    setSubject(event.target.value);
  };
  const SemesterHandleChange = (event) => {
    setSemester(event.target.value);
  };
  const updateBaoCaoHandler = () => {
    if (subject === "" || semester === "") {
      swal("Lỗi", "Vui lòng chọn đủ thông tin", "error");
      return;
    }
    sendRequestUpdate({ maMH: subject.maMH, maHK: semester.maHK });
  };
  if (statusUpdate === "pending") return <Backdrop />;
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <Grid container rowSpacing={3}>
      <Grid item sm={1} sx={{ alignItems: "center" }}>
        <Typography variant="h6" component="h6" sx={{ fontSize: "17px" }}>
          Lựa chọn:
        </Typography>
      </Grid>
      <Grid item sm={5}>
        <FormControl
          size="small"
          sx={{ minWidth: "110px", marginRight: "8px" }}
        >
          <InputLabel id="idSelectClass">Môn học*</InputLabel>
          <Select
            labelId="selectSubject"
            id="idSelectSuject"
            value={subject}
            label="Môn học"
            onChange={SubjectHandleChange}
          >
            {props.monHoc.map((x) => (
              <MenuItem key={x.maMH} value={x}>
                {x.tenMH}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: "150px" }}>
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
      <Grid item sm={6}>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={updateBaoCaoHandler}
            variant="contained"
            color="primary"
          >
            Cập nhật
          </Button>
        </Stack>
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
          rows={tongKetMons}
          rowsPerPageOptions={[5, 10, 20]}
          columns={columns}
        />
      </Grid>
    </Grid>
  );
};

export default BCMonHoc;
