import React from "react";
import CoursesTable from "./CoursesTable";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AddCourseForm from "./AddCourseForm";
import EditCourseForm from "./EditCourseForm";
import { useRouteMatch, useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllCourses, getAllSubjects } from "../../lib/api";
import Loading from "../UI/Loading";
import BackdropLoading from "../UI/BackdropLoading";
const CoursesList = () => {
  const { sendRequest, data, status, error } = useHttp(getAllCourses, true);
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  React.useEffect(() => {
    if (status === "completed" && data) {
      setAllCourses(data);
      console.log(data);
    }
  }, [data, status]);
  const history = useHistory();
  const { url } = useRouteMatch();
  const [isAddCourseDialogVisible, setIsAddCourseDialogVisible] =
    React.useState(false);
  const [isEditCourseDialogVisible, setIsEditCourseDialogVisible] =
    React.useState(false);
  const [editCourse, setEditCourse] = React.useState(null);
  const [allCourses, setAllCourses] = React.useState([]);
  const updateCourse = (course) => {
    let newCourses = allCourses.map((x) =>
      x.maCTH !== course.maCTH ? x : course
    );
    setAllCourses(newCourses);
  };
  const delCourses = (Courses) => {
    let newCourses = [...allCourses];
    for (let i = 0; i < Courses.length; i++) {
      newCourses = newCourses.filter((x) => x.maCTH !== Courses[i]);
    }
    console.log(newCourses);
    setAllCourses(newCourses);
  };
  const addCourse = (course) => {
    let newCourses = [...allCourses];
    newCourses.push(course);
    setAllCourses(newCourses);
  };
  const showAddCourseHandler = () => {
    setIsAddCourseDialogVisible(true);
  };
  const hideAddCourseHandler = () => {
    setIsAddCourseDialogVisible(false);
  };
  const showEditCourseHandler = (course) => {
    setEditCourse(course);

    setIsEditCourseDialogVisible(true);
  };
  const hideEditCourseHandler = () => {
    setIsEditCourseDialogVisible(false);
  };
  const moveToSubjectPage = () => {
    history.push(`${url}/subjects`);
  };
  if (status === "pending") return <Loading />;
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <Breadcrumbs mb="16px" aria-label="breadcrumb">
        <Typography color="text.primary">Chương trình học</Typography>
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
          Danh sách chương trình học
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={moveToSubjectPage} variant="outlined" color="info">
            Danh sách môn học
          </Button>
          <Button
            onClick={showAddCourseHandler}
            variant="contained"
            color="success"
          >
            Thêm
          </Button>
        </Stack>
      </Box>

      <Grid
        container
        sx={{
          boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Grid item xs={12}>
          <CoursesTable
            delCourses={delCourses}
            onShowEdit={showEditCourseHandler}
            data={allCourses}
          />
        </Grid>
      </Grid>
      <CoursesDialog
        openAdd={isAddCourseDialogVisible}
        onCloseAdd={hideAddCourseHandler}
        openEdit={isEditCourseDialogVisible}
        onCloseEdit={hideEditCourseHandler}
        editCourse={editCourse}
        updateCourse={updateCourse}
        addCourse={addCourse}
      />
    </>
  );
};

const CoursesDialog = (props) => {
  const { sendRequest, data, status, error } = useHttp(getAllSubjects, true);
  React.useState(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    if (props.openAdd || props.openEdit) return <BackdropLoading />;
    else return <></>;
  }
  if (error) return <p>{error}</p>;
  return (
    <>
      {props.openAdd && (
        <AddCourseForm
          addCourse={props.addCourse}
          subjects={data}
          open={props.openAdd}
          onClose={props.onCloseAdd}
        />
      )}
      {props.openEdit && (
        <EditCourseForm
          updateCourse={props.updateCourse}
          editCourse={props.editCourse}
          subjects={data}
          open={props.openEdit}
          onClose={props.onCloseEdit}
        />
      )}
    </>
  );
};

export default CoursesList;
