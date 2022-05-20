import React from "react";
import Grid from "@mui/material/Grid";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import QuaTrinhHocTable from "../components/detail-student/QuaTrinhHocTable";
import useHttp from "../hooks/use-http";
import { getDetailStudentById } from "../lib/api";
import { useParams } from "react-router-dom";
import Loading from "../components/UI/Loading";

const Profile = () => {
  const params = useParams();
  const { sendRequest, status, error, data } = useHttp(
    getDetailStudentById,
    true
  );
  React.useEffect(() => {
    sendRequest(params.id);
  }, [sendRequest, params.id]);
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <Grid spacing={2} container>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              boxShadow: "0px 0px  30px 3px rgba(0, 0, 0, 0.08)",
              padding: 3,
              borderRadius: 4,
            }}
          >
            <Stack spacing={1} direction="column">
              <Typography variant="h6">Thông tin cơ bản</Typography>
              <Divider />
              <Typography variant="subtitle1">
                {"Tên: " + data.hoTen}
              </Typography>
              <Typography variant="subtitle1">
                {"Giới tính: " + data.gioiTinh}
              </Typography>
              <Typography variant="subtitle1">
                {"Địa chỉ: " + data.diaChi}
              </Typography>
              <Typography variant="subtitle1">
                {"Ngày sinh: " + data.ngaySinh}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuaTrinhHocTable qth={data.qth} />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
