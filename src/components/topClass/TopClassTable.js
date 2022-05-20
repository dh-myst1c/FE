import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  {
    field: "tenLop",
    headerName: "Lớp",
    width: 80,
    headerAlign: "center",
    align: "center",
    sortable: false,
  },
  {
    field: "tiLe",
    headerName: "Tỉ lệ đạt",
    width: 220,
    headerAlign: "center",
    align: "center",
    sortable: false,
  },
];
const TopClassTable = (props) => {
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

export default TopClassTable;
