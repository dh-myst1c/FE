import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useHttp from "../hooks/use-http";
import { login } from "../lib/api";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import swal from "sweetalert";
import LinearLoading from "../components/UI/LinearLoading";
const Login = (props) => {
  const { sendRequest, status, data, error } = useHttp(login);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const loginFormHandler = async (event) => {
    event.preventDefault();
    let request = {
      email: enteredEmail,
      password: enteredPassword,
    };
    sendRequest(request);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        localStorage.setItem("accessToken", data["access_token"]);
        swal(
          "Đăng nhập thành công!",
          "Bạn đã đăng nhập thành công!",
          "success"
        );
        props.onReload();
      } else if (error) {
        swal("Đã có lỗi xảy ra", error, "error");
        localStorage.removeItem("accessToken");
      }
    }
  }, [data, error, status, props]);
  return (
    <>
      {status === "pending" && <LinearLoading />}
      <Grid container>
        <Grid item sm={1}></Grid>
        <Grid container item sm={4} xs={12} alignItems="center">
          <Container fixed>
            <Box display="flex" alignItems="center" marginBottom="10px">
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundImage: `url(${"./logo.png"})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <Typography
                sx={{ fontWeight: 700, fontSize: "30px", marginLeft: "20px" }}
              >
                Eduma
              </Typography>
            </Box>

            <form onSubmit={loginFormHandler}>
              <Stack sx={{}} spacing={2} marginBottom="10px">
                <Typography sx={{ fontWeight: 700, fontSize: "40px" }}>
                  Đăng nhập
                </Typography>
                <TextField
                  onChange={(event) => {
                    setEnteredEmail(event.target.value);
                  }}
                  value={enteredEmail}
                  id="email"
                  label="Email*"
                  variant="outlined"
                  color="info"
                />
                <TextField
                  onChange={(event) => {
                    setEnteredPassword(event.target.value);
                  }}
                  value={enteredPassword}
                  id="password"
                  label="Mật khẩu*"
                  type="password"
                  variant="outlined"
                  color="info"
                />
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#0056fb" }}
                >
                  {status === "pending" ? "Đang đăng nhập ..." : "Đăng nhập"}
                </Button>
              </Stack>
            </form>
          </Container>
        </Grid>

        <Grid container item sm={7} xs={12}>
          <Box
            sx={{
              width: "100%",
              height: "750px",
              backgroundImage: `url(${"./backgrounddep.jpg"})`,
              backgroundSize: "contain",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
            }}
          ></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
