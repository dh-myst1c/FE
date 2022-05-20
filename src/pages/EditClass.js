import React, { useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import { useHistory, useParams, useLocation } from "react-router-dom";
import AddStudentToClassForm from "../components/classes/AddStudentToClassForm";
import StudentOfClassTable from "../components/classes/StudentOfClassTable";
import useHttp from "../hooks/use-http";
import { getClassesById } from "../lib/api";
import Loading from "../components/UI/Loading";
import EditCanBo from "../components/classes/EditCanBo";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const EditClass = (props) => {
  let queryParams = useQuery();
  const history = useHistory();
  const params = useParams();
  const { sendRequest, status, error, data } = useHttp(getClassesById, true);

  const [allStudents, setAllStudents] = React.useState([]);
  const [tenGVCN, setTenGVCN] = React.useState("");
  const [tenLT, setTenLT] = React.useState("");
  const [searchStudents, setSearchStudents] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const updateStudent = (Student) => {
    let newStudents = allStudents.map((x) =>
      x.maHS !== Student.maHS ? x : Student
    );
    setAllStudents(newStudents);
  };
  const delStudents = (Students) => {
    let newStudents = [...allStudents];
    for (let i = 0; i < Students.length; i++) {
      newStudents = newStudents.filter((x) => x.maHS !== Students[i]);
    }
    console.log(newStudents);
    setAllStudents(newStudents);
  };
  const addStudents = (Students) => {
    let newStudents = [...allStudents];
    console.log(newStudents);
    newStudents.push(...Students);
    console.log(newStudents);
    setAllStudents(newStudents);
  };
  useEffect(() => {
    sendRequest([params.id, queryParams.get("maHK")]);
  }, [sendRequest, params.id, queryParams]);
  useEffect(() => {
    if (status === "completed" && data) {
      setAllStudents(data.hocSinh);
      setTenGVCN(data.tenGVCN);
      setTenLT(data.tenLT);
    }
  }, [data, status]);
  useEffect(() => {
    if (query === "" || !query) {
      setSearchStudents(allStudents);
    } else {
      setSearchStudents(
        allStudents.filter((x) =>
          x.hoTen.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [allStudents, query]);
  const moveToClassesHandler = () => {
    history.push("/classes");
  };
  const editCanBoHandler = (data) => {
    setTenGVCN(data.tenGVCN);
    setTenLT(data.tenLT);
  };
  const [isAddStudentDialogVisible, setIsAddStudentDialogVisible] =
    React.useState(false);
  const showAddStudentHandler = () => {
    setIsAddStudentDialogVisible(true);
  };
  const hideAddStudentHandler = () => {
    setIsAddStudentDialogVisible(false);
  };
  const [isEditCanBoDialogVisible, setIsEditCanBoDialogVisible] =
    React.useState(false);
  const showEditCanBoHandler = () => {
    setIsEditCanBoDialogVisible(true);
  };
  const hideEditCanBoHandler = () => {
    setIsEditCanBoDialogVisible(false);
  };

  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Breadcrumbs mb="16px" aria-label="breadcrumb">
        <Link
          sx={{ cursor: "pointer" }}
          onClick={moveToClassesHandler}
          underline="hover"
          color="inherit"
        >
          Lớp học
        </Link>

        <Typography color="text.primary">{`${data.tenLop} - ${
          props.hk.find(
            (x) => x.maHK.toString() === queryParams.get("maHK").toString()
          ).tenHK
        }`}</Typography>
      </Breadcrumbs>
      <Grid container mb={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            Thông tin lớp học
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <TextField
              id="search"
              label="Tìm kiếm"
              variant="outlined"
              size="small"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              sx={{ marginRight: "8px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={showAddStudentHandler}
              variant="contained"
              color="success"
            >
              Thêm
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        sx={{
          boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Grid item xs={12}>
          <StudentOfClassTable
            maHK={1}
            maLop={data.maLop}
            data={searchStudents}
            updateStudent={updateStudent}
            delStudents={delStudents}
            tenGVCN={tenGVCN}
            tenLT={tenLT}
            onShowEditCanBo={showEditCanBoHandler}
          />
        </Grid>
      </Grid>

      {isAddStudentDialogVisible && (
        <AddStudentToClassForm
          maHK={queryParams.get("maHK")}
          maLop={data.maLop}
          open={isAddStudentDialogVisible}
          onClose={hideAddStudentHandler}
          addStudents={addStudents}
        />
      )}
      {isEditCanBoDialogVisible && (
        <EditCanBo
          maHK={queryParams.get("maHK")}
          maLop={data.maLop}
          open={isEditCanBoDialogVisible}
          onClose={hideEditCanBoHandler}
          students={allStudents}
          onEditCanBo={editCanBoHandler}
        />
      )}
    </>
  );
};
export default EditClass;
