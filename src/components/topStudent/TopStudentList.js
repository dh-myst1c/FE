import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import React, { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { getTopStudents } from "../../lib/api";
import TopStudentTable from "./TopStudentTable";
import Loading from "../UI/Loading";

const TopStudentList = (props) => {
  const { sendRequest, status, data, error } = useHttp(getTopStudents, true);
  const [hocKy, setHocKy] = React.useState(props.hk[0]);
  useEffect(() => {
    if (hocKy !== "") {
      sendRequest({ maHK: hocKy.maHK });
    }
  }, [sendRequest, hocKy]);

  if (status === "pending") {
    return <Loading />;
  }
  if (status === "completed") {
    if (error) {
      return <p className="centered focused">{error}</p>;
    }
  }

  return (
    <>
      <Box
        mb="16px"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2">
          Xếp hạng học sinh
        </Typography>
        <TextField
          label="Học kỳ"
          sx={{ minWidth: "120px" }}
          id="semester"
          size="small"
          select
          value={hocKy}
          onChange={(event) => {
            setHocKy(event.target.value);
          }}
        >
          {props.hk.map((x) => (
            <MenuItem key={x.maHK} value={x}>
              {x.tenHK}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid
        container
        sx={
          {
            // boxShadow: "0px 0px  30px 5px rgba(0, 0, 0, 0.08)",
          }
        }
      >
        <Grid item xs={12}>
          <TopStudentTable data={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default TopStudentList;
