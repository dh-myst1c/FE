import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import React from "react";
import TranscriptTable from "./TranscriptTable";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import AddLoaiHinhKT from "./AddLoaiHinhKT";
import useHttp from "../../hooks/use-http";
import { getAllClassesSemSub } from "../../lib/api";
import Loading from "../UI/Loading";
const TranscriptList = () => {
  const { sendRequest, error, data, status } = useHttp(
    getAllClassesSemSub,
    true
  );
  const [lop, setLop] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [semester, setSemester] = React.useState("");
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  const [isAddLoaiHinhKTDialogVisible, setIsAddLoaiHinhKTDialogVisible] =
    React.useState(false);
  const hideAddLoaiHinhKTHandler = () => {
    setIsAddLoaiHinhKTDialogVisible(false);
  };

  const LopHandleChange = (event) => {
    setLop(event.target.value);
  };
  const SubjectHandleChange = (event) => {
    setSubject(event.target.value);
  };
  const SemesterHandleChange = (event) => {
    setSemester(event.target.value);
  };
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Grid container rowSpacing={4}>
        <Grid item sm={12}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            Phiếu điểm
          </Typography>
        </Grid>
        <Grid item sm={1} sx={{ alignItems: "center" }}>
          <Typography variant="h6" component="h6" sx={{ fontSize: "17px" }}>
            Lựa chọn:
          </Typography>
        </Grid>
        <Grid item sm={5}>
          <FormControl
            size="small"
            sx={{ minWidth: "90px", marginRight: "8px" }}
          >
            <InputLabel id="idSelectClass">Lớp*</InputLabel>
            <Select
              labelId="selectClass"
              id="idSelectClass"
              value={lop}
              label="Lớp"
              type="string"
              onChange={LopHandleChange}
            >
              {data.lop.map((item) => (
                <MenuItem key={item.maLop} value={item}>
                  {item.tenLop}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {data.monHoc.map((item) => (
                <MenuItem key={item.maMH} value={item}>
                  {item.tenMH}
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
              {data.hocKy.map((item) => (
                <MenuItem key={item.maHK} value={item}>
                  {item.tenHK}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid display="flex" item sm={6} sx={{ justifyContent: "flex-end" }}>
          <TextField
            id="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            label="Tìm kiếm"
            variant="outlined"
            size="small"
            sx={{ marginRight: "6px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {/* <Button
            variant="contained"
            color="success"
            onClick={showLoaiHinhKTCourseHandler}
          >
            Thêm
          </Button> */}
        </Grid>
        <Box
          marginTop="10px"
          width="100%"
          sm={12}
          container
          sx={{
            boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
          }}
        >
          <TranscriptTable
            query={query}
            monHoc={subject}
            lop={lop}
            hocKy={semester}
          />
        </Box>

        <AddLoaiHinhKT
          open={isAddLoaiHinhKTDialogVisible}
          onClose={hideAddLoaiHinhKTHandler}
        />
      </Grid>
    </>
  );
};

export default TranscriptList;
