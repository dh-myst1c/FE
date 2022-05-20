import React from "react";
import Grid from "@mui/material/Grid";
import ClassItem from "./ClassItem";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import TextField from "@mui/material/TextField";

import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Add } from "@mui/icons-material";
import Loading from "../UI/Loading";
import AddClassForm from "./AddClassForm";
import { getAllClasses } from "../../lib/api";
import useHttp from "../../hooks/use-http";
const ClassList = (props) => {
  const { sendRequest, status, data, error } = useHttp(getAllClasses, true);
  const [isReload, setIsReload] = React.useState(true);
  const [hocKy, setHocKy] = React.useState(props.hk[0]);

  React.useEffect(() => {
    if (isReload === true) {
      sendRequest(hocKy.maHK);
      setIsReload(false);
    }
  }, [sendRequest, isReload, hocKy]);
  const [grade, setGrade] = React.useState(10);
  const [isAddClassDialogVisible, setIsAddClassDialogVisible] =
    React.useState(false);
  const handleChange = (event) => {
    setGrade(event.target.value);
  };
  const handleChangeHK = (event) => {
    setHocKy(event.target.value);
    setIsReload(true);
  };
  const showAddClassHandler = () => {
    setIsAddClassDialogVisible(true);
  };
  const hideAddClassHandler = () => {
    setIsAddClassDialogVisible(false);
  };
  if (status === "pending") return <Loading />;
  if (error) return <h4>Đã có lỗi xảy ra</h4>;
  const filteredClasses = data.filter((e) => e.maKhoi === grade - 9);
  return (
    <>
      <Breadcrumbs mb="16px" aria-label="breadcrumb">
        <Typography color="text.primary">Lớp học</Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Danh sách lớp học
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <TextField
            value={grade}
            onChange={handleChange}
            id="khoi"
            label="Khối"
            select
          >
            <MenuItem value={10}>Khối 10</MenuItem>
            <MenuItem value={11}>Khối 11</MenuItem>

            <MenuItem value={12}>Khối 12</MenuItem>
          </TextField>
          <TextField
            value={hocKy}
            onChange={handleChangeHK}
            id="hocKy"
            label="Học Kỳ"
            select
          >
            {props.hk.map((x) => (
              <MenuItem key={x.maHK} value={x}>
                {x.tenHK}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <ul>
        <Grid mb="32px" container spacing={{ xs: 3, md: 6 }} sx={{ flex: 1 }}>
          {filteredClasses.map((e) => (
            <ClassItem hk={hocKy} class={e} key={e.maLop} />
          ))}
        </Grid>
      </ul>
      <Fab
        sx={{ position: "fixed", bottom: "32px", right: "32px" }}
        color="primary"
        aria-label="add"
        size="large"
        title="Thêm lớp học"
        onClick={showAddClassHandler}
      >
        <Add sx={{ color: "#fff" }} />
      </Fab>
      {isAddClassDialogVisible && (
        <AddClassForm
          open={isAddClassDialogVisible}
          onClose={hideAddClassHandler}
          onReload={() => {
            setIsReload(true);
          }}
        />
      )}
    </>
  );
};
export default ClassList;
