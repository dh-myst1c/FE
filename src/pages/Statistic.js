import React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import BCMonHoc from "../components/statistic/bcMonHoc";
import BCHocKy from "../components/statistic/bcHocKy";
import useHttp from "../hooks/use-http";
import { getAllClassesSemSub } from "../lib/api";
import Loading from "../components/UI/Loading";
const Statistic = () => {
  const { sendRequest, status, error, data } = useHttp(
    getAllClassesSemSub,
    true
  );
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <Box sx={{ width: "100%" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Báo cáo theo môn học" value="1" />
            <Tab label="Báo cáo theo học kì" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box>
            <BCMonHoc
              lop={data.lop}
              hocKy={data.hocKy}
              monHoc={data.monHoc}
            ></BCMonHoc>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <BCHocKy lop={data.lop} hocKy={data.hocKy}></BCHocKy>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Statistic;
