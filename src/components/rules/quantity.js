import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Quantity = (props) => {
  const [classnumber, setClassNumber] = React.useState(props.maxClass);
  const [peoplemin, setPeopleMin] = React.useState(props.minStudent);
  const [peoplemax, setPeopleMax] = React.useState(props.maxStudent);
  const [subjectnumber, setSubjectNumber] = React.useState(props.maxSubject);

  const selectClassNumberHandler = (event) => {
    setClassNumber(event.target.value);
    props.onTSChange({
      maTS: 1,
      tenTS: "Số lớp tối đa",
      giaTri: event.target.value,
    });
  };
  const selectPeopleMaxHandler = (event) => {
    setPeopleMax(event.target.value);
    props.onTSChange({
      maTS: 3,
      tenTS: "Sĩ số tối đa",
      giaTri: event.target.value,
    });
  };
  const selectPeopleMinHandler = (event) => {
    setPeopleMin(event.target.value);
    props.onTSChange({
      maTS: 2,
      tenTS: "Sĩ số tối thiểu",
      giaTri: event.target.value,
    });
  };
  const selectSubjectHandler = (event) => {
    setSubjectNumber(event.target.value);
    props.onTSChange({
      maTS: 4,
      tenTS: "Số môn học tối đa",
      giaTri: event.target.value,
    });
  };

  return (
    <Grid
      container
      rowSpacing={1.5}
      justifyContent="space-between"
      padding="0 70px 5px 70px"
      alignItems="center"
    >
      <Grid item sm={8} xs={8}>
        <Typography variant="h6" gutterBottom component="div">
          Số lớp tối đa:
        </Typography>
      </Grid>
      <Grid item sm={4} xs={4}>
        <TextField
          fullWidth
          id="class-number"
          label="Số lớp"
          type="number"
          value={classnumber}
          onChange={selectClassNumberHandler}
          disabled={!props.setDis}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item sm={8} xs={8}>
        <Box Box display="flex" alignItems="center">
          <Typography variant="h6" gutterBottom component="div">
            Sĩ số lớp
          </Typography>
          <Typography fontWeight="light" fontSize="14px" margin="0 0 5px 5px">
            (Tối đa/Tối thiểu):
          </Typography>
        </Box>
      </Grid>

      <Grid item sm={2} xs={2}>
        <TextField
          id="peoplemax-number"
          label="Tối đa"
          type="number"
          value={peoplemax}
          onChange={selectPeopleMaxHandler}
          disabled={!props.setDis}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item sm={2} xs={2}>
        <TextField
          id="peoplemin-number"
          label="Tối thiểu"
          type="number"
          value={peoplemin}
          onChange={selectPeopleMinHandler}
          disabled={!props.setDis}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item sm={8} xs={8}>
        <Typography variant="h6" gutterBottom component="div">
          Số môn học tối đa:
        </Typography>
      </Grid>
      <Grid item sm={4} xs={4}>
        <TextField
          id="subject-number"
          label="Môn học"
          type="number"
          value={subjectnumber}
          onChange={selectSubjectHandler}
          disabled={!props.setDis}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Quantity;
