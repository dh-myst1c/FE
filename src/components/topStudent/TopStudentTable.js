import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "Mã HS",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "hoTen",
    headerName: "Họ tên",
    width: 220,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "tenLop",
    headerName: "Lớp",
    width: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "diemTB",
    headerName: "Điểm trung bình",
    width: 150,
    headerAlign: "center",
    align: "center",
  },
];

const TopStudentTable = (props) => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <DataGrid
        disableColumnMenu
        disableSelectionOnClick
        rows={props.data}
        columns={columns}
      />
    </div>
  );
};

export default TopStudentTable;
