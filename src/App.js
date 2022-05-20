import { Route, Redirect, Switch } from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header/Header";
import SideBar from "./components/layout/SideBar/SideBar";
import Box from "@mui/material/Box";
import useHttp from "./hooks/use-http";
import { getUser } from "./lib/api";
import CircularProgress from "@mui/material/CircularProgress";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { viVN } from "@mui/material/locale";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Courses from "./pages/Courses";
import Transcript from "./pages/Transcript";
import Statistic from "./pages/Statistic";
import Regulation from "./pages/Regulation";

// const Home = React.lazy(() => import("./pages/Home"));
// const Students = React.lazy(() => import("./pages/Students"));
// const Classes = React.lazy(() => import("./pages/Classes"));
// const Courses = React.lazy(() => import("./pages/Courses"));
// const Transcript = React.lazy(() => import("./pages/Transcript"));
// const Statistic = React.lazy(() => import("./pages/Statistic"));
// const Regulation = React.lazy(() => import("./pages/Regulation"));

const theme = createTheme(
  {
    typography: {
      fontFamily: "Inter, Roboto, san-serif",
    },
    palette: {
      primary: { main: "#03c9d7" },
      secondary: { main: "#fc9678" },
      error: { main: "#e46a76" },
      warning: { main: "#fac90f" },
      success: { main: "#00c292" },
    },
    components: {
      MuiIconButton: {
        variants: [
          {
            props: { variant: "dark" },
            style: {
              color: "#949db2",
            },
          },
        ],
      },
      MuiButton: {
        variants: [
          {
            props: { variant: "contained" },
            style: {
              color: "#fff",
            },
          },
        ],
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            // margin: "8px 0 4px",
            fontWeight: 500,
            fontSize: "14px",
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {},
          label: {
            fontWeight: 500,
            fontSize: "14px",
          },
        },
      },
    },
  },
  viVN
);
function App() {
  const { sendRequest, status, data, error } = useHttp(getUser, true);
  const [isReload, setIsReload] = useState(true);
  useEffect(() => {
    if (isReload === true) {
      sendRequest();
      setIsReload(false);
    }
  }, [sendRequest, isReload]);

  if (status === "pending")
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Switch>
          <Route exact path="/login">
            {error ? (
              <Login
                onReload={() => {
                  setIsReload(true);
                }}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route path="/">
            {!error ? (
              <Box sx={{ display: "flex" }}>
                <SideBar user={data} />
                <Box sx={{ flex: "1" }}>
                  <Header
                    user={data}
                    onReload={() => {
                      setIsReload(true);
                    }}
                  />
                  <main>
                    <Suspense
                      fallback={
                        <Box
                          sx={{
                            width: "100%",
                            minHeight: "calc(100vh - 48px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CircularProgress />
                        </Box>
                      }
                    >
                      <Switch>
                        <Route exact path="/">
                          <Redirect to="/home"></Redirect>
                        </Route>
                        <Route exact path="/home">
                          <Home />
                        </Route>
                        <Route path="/students">
                          <Students />
                        </Route>
                        <Route path="/classes">
                          <Classes />
                        </Route>
                        <Route path="/courses">
                          <Courses />
                        </Route>
                        <Route exact path="/transcript">
                          <Transcript />
                        </Route>
                        <Route exact path="/statistic">
                          <Statistic />
                        </Route>
                        {data.maNhom === 1 && (
                          <>
                            <Route exact path="/users">
                              <Users />
                            </Route>
                            <Route exact path="/rules">
                              <Regulation />
                            </Route>
                          </>
                        )}
                        {data.maNhom === 2 && (
                          <>
                            <Route exact path="/rules">
                              <Regulation />
                            </Route>
                          </>
                        )}
                      </Switch>
                    </Suspense>
                  </main>
                </Box>
              </Box>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
