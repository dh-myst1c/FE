import React, { useEffect } from "react";
import StatusCard from "../components/status-card/StatusCard";
import TopStudentList from "../components/topStudent/TopStudentList";
import TopClassList from "../components/topClass/TopClassList";
import Chart from "react-apexcharts";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import usehttp from "../hooks/use-http";
import { getAllSems, getOverview, getDatRot } from "../lib/api";
import Loading from "../components/UI/Loading";

const vi = {
  name: "vi",
  options: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    shortMonths: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    toolbar: {
      exportToSVG: "Tải dạng SVG",
      exportToPNG: "Tải dạng PNG",
      exportToCSV: "Tải dạng CSV",
      menu: "Menu",
      selection: "Selection",
      selectionZoom: "Selection Zoom",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      pan: "Panning",
      reset: "Reset Zoom",
    },
  },
};
const initChartOptions = {
  series: [
    {
      name: "Học sinh lên lớp",
      data: [],
    },
    {
      name: "Học sinh ở lại",
      data: [],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
      id: "hey",
      defaultLocale: "vi",
      locales: [vi],
      toolbar: {
        export: {
          csv: {
            headerCategory: "Năm học",
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [],
      // tickPlacement: "between",
    },
    legend: {
      position: "top",
    },
    grid: {
      show: true,
    },
  },
};

const Home = () => {
  const { sendRequest, status, data, error } = usehttp(getAllSems, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") return <Loading />;

  if (error) {
    return <p className="centered focused">{error}</p>;
  }
  return (
    <Grid
      container
      columns={{ sm: 12, xs: 4, md: 12 }}
      rowSpacing={5}
      columnSpacing={4}
      style={{ padding: "20px" }}
    >
      <Grid item sm={6} xs={4}>
        <OverviewList />
      </Grid>
      <Grid item sm={6} xs={4}>
        <ChartYear />
      </Grid>
      <Grid item sm={5} xs={4}>
        <Box
          style={{ padding: "20px" }}
          height="100%"
          width="100%"
          sx={{
            boxShadow: 3,
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          <TopClassList hk={data}></TopClassList>
        </Box>
      </Grid>
      <Grid item sm={7} xs={4}>
        <Box
          style={{ padding: "20px" }}
          height="100%"
          width="100%"
          sx={{
            boxShadow: 3,
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          <TopStudentList hk={data}></TopStudentList>
        </Box>
      </Grid>
    </Grid>
  );
};

const OverviewList = (props) => {
  const { sendRequest, status, data, error } = usehttp(getOverview, true);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  // if (status === "pending") return <Loading />;
  if (status === "completed") {
    if (error) {
      return <h4>{error}</h4>;
    }
  }
  return (
    <Grid container rowSpacing={4} columnSpacing={3}>
      <Grid item sm={6} xs={4}>
        <StatusCard
          icon={"bx bxs-school"}
          count={status === "pending" ? 0 : data.soLopHoc}
          title={"Lớp học"}
        />
      </Grid>
      <Grid item sm={6} xs={4}>
        <StatusCard
          icon={"bx bx-book-reader"}
          count={status === "pending" ? 0 : data.soGV}
          title={"Giáo viên"}
        />
      </Grid>
      <Grid item sm={6} xs={4}>
        <StatusCard
          icon={"bx bx-user-pin"}
          count={status === "pending" ? 0 : data.soHocSinh}
          title={"Học sinh"}
        />
      </Grid>
      <Grid item sm={6} xs={4}>
        <StatusCard
          icon={"bx bx-book-content"}
          count={status === "pending" ? 0 : data.soMonHoc}
          title={"Môn học"}
        />
      </Grid>
    </Grid>
  );
};

const ChartYear = (props) => {
  const { sendRequest, status, data, error } = usehttp(getDatRot, true);
  const [options, setOptions] = React.useState(initChartOptions.options);
  const [series, setSeries] = React.useState(initChartOptions.series);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  useEffect(() => {
    if (status === "completed") {
      if (error) {
        return <h4>{error}</h4>;
      } else if (data) {
        setSeries([
          {
            name: "Học sinh lên lớp",
            data: data.map((x) => x.soLuongDat),
          },
          {
            name: "Học sinh ở lại",
            data: data.map((x) => x.soLuongRot),
          },
        ]);
        const newOpts = { ...initChartOptions.options };
        newOpts.xaxis = {
          ...newOpts.xaxis,
          categories: data.map((x) => x.namHoc),
        };
        setOptions(newOpts);
      }
    }
  }, [data, error, status]);
  return (
    <Box
      height="100%"
      width="100%"
      sx={{
        boxShadow: 3,
        borderRadius: 4,
        backgroundColor: "#fff",
      }}
    >
      <Chart options={options} series={series} type="bar" height="100%" />
    </Box>
  );
};

export default Home;
