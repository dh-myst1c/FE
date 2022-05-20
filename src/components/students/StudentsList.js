import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React, { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getAllStudents } from "../../lib/api";
import StudentsTable from "./StudentsTable";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Search } from "@mui/icons-material";
import Loading from "../UI/Loading";
import AddStudentForm from "./AddStudentForm";
import EditStudentForm from "./EditStudentForm";
const StudentsList = () => {
  const { sendRequest, status, data, error } = useHttp(getAllStudents, true);
  const [isAddStudentDialogVisible, setIsAddStudentDialogVisible] =
    React.useState(false);
  const [isEditStudentDialogVisible, setIsEditStudentDialogVisible] =
    React.useState(false);
  const [editStudent, setEditStudent] = React.useState(null);
  const [allStudents, setAllStudents] = React.useState([]);
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
  const addStudent = (Student) => {
    let newStudents = [...allStudents];
    newStudents.push(Student);
    setAllStudents(newStudents);
  };
  const showAddStudentHandler = () => {
    setIsAddStudentDialogVisible(true);
  };
  const hideAddStudentHandler = () => {
    setIsAddStudentDialogVisible(false);
  };
  const showEditStudentHandler = (Student) => {
    setEditStudent(Student);

    setIsEditStudentDialogVisible(true);
  };
  const hideEditStudentHandler = () => {
    setIsEditStudentDialogVisible(false);
  };

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  useEffect(() => {
    if (status === "completed" && data) {
      setAllStudents(data);
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
  if (status === "pending") {
    return <Loading />;
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  return (
    <>
      <Breadcrumbs mb="16px" aria-label="breadcrumb">
        {/* <Link underline="hover" color="inherit" href="/students">
          Học sinh
        </Link> */}
        <Typography color="text.primary">Học sinh</Typography>
      </Breadcrumbs>
      <Box
        mb="16px"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
          Danh sách học sinh
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
      </Box>

      <Grid
        container
        sx={{
          boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Grid item xs={12}>
          <StudentsTable
            onShowEdit={showEditStudentHandler}
            data={searchStudents}
            delStudents={delStudents}
          />
        </Grid>
      </Grid>
      {isAddStudentDialogVisible && (
        <AddStudentForm
          open={isAddStudentDialogVisible}
          addStudent={addStudent}
          onClose={hideAddStudentHandler}
        />
      )}
      {isEditStudentDialogVisible && (
        <EditStudentForm
          updateStudent={updateStudent}
          editStudent={editStudent}
          open={isEditStudentDialogVisible}
          onClose={hideEditStudentHandler}
        />
      )}
    </>
  );
};

export default StudentsList;
