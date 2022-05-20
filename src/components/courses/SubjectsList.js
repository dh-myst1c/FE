import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AddSubjectForm from "./AddSubjectForm";
import EditSubjectForm from "./EditSubjectForm";
import SubjectsTable from "./SubjectsTable";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllSubjects } from "../../lib/api";
import Loading from "../UI/Loading";
const SubjectsList = () => {
  const { sendRequest, data, error, status } = useHttp(getAllSubjects, true);
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  React.useEffect(() => {
    if (status === "completed" && data) {
      setAllSubjects(data);
      console.log(data);
    }
  }, [data, status]);
  const history = useHistory();
  const [isAddSubjectDialogVisible, setIsAddSubjectDialogVisible] =
    React.useState(false);
  const [isEditSubjectDialogVisible, setIsEditSubjectDialogVisible] =
    React.useState(false);
  const [editSubject, setEditSubject] = React.useState(null);
  const [allSubjects, setAllSubjects] = React.useState([]);
  const updateSubject = (subject) => {
    let newSubjects = allSubjects.map((x) =>
      x.maMH !== subject.maMH ? x : subject
    );
    setAllSubjects(newSubjects);
  };
  const delSubjects = (Subjects) => {
    let newSubjects = [...allSubjects];
    for (let i = 0; i < Subjects.length; i++) {
      newSubjects = newSubjects.filter((x) => x.maMH !== Subjects[i]);
    }
    console.log(newSubjects);
    setAllSubjects(newSubjects);
  };
  const addSubject = (subject) => {
    let newSubjects = [...allSubjects];
    newSubjects.push(subject);
    setAllSubjects(newSubjects);
  };
  const showAddSubjectHandler = () => {
    setIsAddSubjectDialogVisible(true);
  };
  const hideAddSubjectHandler = () => {
    setIsAddSubjectDialogVisible(false);
  };
  const showEditSubjectHandler = (subject) => {
    setEditSubject(subject);
    setIsEditSubjectDialogVisible(true);
  };
  const hideEditSubjectHandler = () => {
    setIsEditSubjectDialogVisible(false);
  };
  const moveToCoursesPageHandler = () => {
    history.push(`/courses`);
  };
  if (status === "pending") return <Loading />;
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <Breadcrumbs mb="16px" aria-label="breadcrumb">
        <Link
          sx={{ cursor: "pointer" }}
          onClick={moveToCoursesPageHandler}
          underline="hover"
          color="inherit"
        >
          Chương trình học
        </Link>
        <Typography color="text.primary">Môn học</Typography>
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
          Danh sách môn học
        </Typography>
        <Button
          onClick={showAddSubjectHandler}
          variant="contained"
          color="success"
        >
          Thêm
        </Button>
      </Box>

      <Grid
        container
        sx={{
          boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Grid item xs={12}>
          <SubjectsTable
            onShowEdit={showEditSubjectHandler}
            data={allSubjects}
            delSubjects={delSubjects}
          />
        </Grid>
      </Grid>

      {isAddSubjectDialogVisible && (
        <AddSubjectForm
          open={isAddSubjectDialogVisible}
          addSubject={addSubject}
          onClose={hideAddSubjectHandler}
        />
      )}

      {isEditSubjectDialogVisible && (
        <EditSubjectForm
          updateSubjects={updateSubject}
          editSubject={editSubject}
          open={isEditSubjectDialogVisible}
          onClose={hideEditSubjectHandler}
        />
      )}
    </>
  );
};
export default SubjectsList;
