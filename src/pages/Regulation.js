import React from "react";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import Quanity from "../components/rules/quantity";
import Rank from "../components/rules/rank";
import Age from "../components/rules/age";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/SaveAltOutlined";
import useHttp from "../hooks/use-http";
import { getAllParams, editParams } from "../lib/api";
import Loading from "../components/UI/Loading";
import swal from "sweetalert";

const Regulation = () => {
  const { sendRequest, data, status, error } = useHttp(getAllParams, true);
  const {
    sendRequest: suaThamSo,
    data: dataEdit,
    status: statusEdit,
    error: errorEdit,
  } = useHttp(editParams);
  const [isReload, setIsReload] = React.useState(true);
  React.useEffect(() => {
    if (isReload === true) {
      sendRequest();
      setIsReload(false);
    }
  }, [sendRequest, isReload]);
  const [value, setValue] = React.useState("qua");

  const [edit, setEdit] = React.useState(false);
  const handleChange = (event, newValue) => {
    //alert( (Table_Quanity.find((e) => e.name==="maxClass" )).value);
    setValue(newValue);
    setThamSo([]);
  };

  const [thamSo, setThamSo] = React.useState([]);
  const thamSoHandler = (params) => {
    setThamSo((prev) => {
      if (!params) return [];
      if (prev.length === 0) return [params];
      const newState = [...prev];
      let t = newState.find((e) => e.maTS === params.maTS);
      if (!t) newState.push(params);
      else t.giaTri = params.giaTri;
      return newState;
    });
  };
  const editParamsHandler = () => {
    suaThamSo(thamSo);
  };
  React.useEffect(() => {
    if (statusEdit === "completed") {
      if (dataEdit) {
        setIsReload(true);
        setEdit(false);
        swal(
          "Cập nhật thành công!",
          "Bạn đã cập nhật tham số thành công",
          "success"
        );
      } else if (errorEdit) swal("Đã có lỗi xảy ra", errorEdit, "error");
    }
  }, [dataEdit, errorEdit, statusEdit]);
  if (status === "pending") return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      marginTop="20px"
      rowSpacing={1.5}
    >
      <Grid item sm={12} xs={12} display="flex" justifyContent="space-between">
        <Box marginLeft="35px">
          <h1> Thay đổi qui định</h1>
        </Box>
        <Box>
          <IconButton
            aria-label="edit"
            color="primary"
            disabled={edit}
            onClick={() => {
              setEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item sm={12} xs={12}>
        <TabContext value={value}>
          <Box
            sx={{
              minWidth: "420px",
              maxWidth: "700px",
              borderRadius: 4,
              borderColor: "divider",
              boxShadow: 3,
              padding: "0 10px 0 10px",
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
              variant="fullWidth"
            >
              <Tab style={{ fontSize: "18px" }} label="Số lượng" value="qua" />
              <Tab style={{ fontSize: "18px" }} label="Xếp loại" value="rank" />
              <Tab style={{ fontSize: "18px" }} label="Độ tuổi" value="age" />
            </TabList>
          </Box>
          <TabPanel value="qua">
            <Box
              minWidth="440px"
              padding="25px 0 10px 0"
              maxWidth="650px"
              sx={{
                boxShadow: 3,
                borderRadius: 4,
                backgroundColor: "#fff",
              }}
            >
              <Quanity
                onTSChange={thamSoHandler}
                setDis={edit}
                maxClass={data.find((e) => e.maTS === 1).giaTri}
                maxStudent={data.find((e) => e.maTS === 3).giaTri}
                minStudent={data.find((e) => e.maTS === 2).giaTri}
                maxSubject={data.find((e) => e.maTS === 4).giaTri}
              ></Quanity>
            </Box>
          </TabPanel>
          <TabPanel value="rank">
            <Box
              minWidth="440px"
              padding="15px 0 5px 0"
              maxWidth="650px"
              sx={{
                boxShadow: 3,
                borderRadius: 4,
                backgroundColor: "#fff",
              }}
            >
              <Rank
                onTSChange={thamSoHandler}
                setDis={edit}
                maxDiemChuan={data.find((e) => e.maTS === 5).giaTri}
              ></Rank>
            </Box>
          </TabPanel>
          <TabPanel value="age">
            <Box
              minWidth="440px"
              padding="15px 0 5px 0"
              maxWidth="650px"
              sx={{
                boxShadow: 3,
                borderRadius: 4,
                backgroundColor: "#fff",
              }}
            >
              <Age
                onTSChange={thamSoHandler}
                setDis={edit}
                maxAge={data.find((e) => e.maTS === 7).giaTri}
                minAge={data.find((e) => e.maTS === 6).giaTri}
              ></Age>
            </Box>
          </TabPanel>
        </TabContext>
      </Grid>
      <Grid item sm={12} xs={8}>
        <Button
          style={{ display: edit ? "" : "none" }}
          variant="contained"
          size="Large"
          endIcon={<SaveIcon />}
          disabled={statusEdit === "pending"}
          onClick={editParamsHandler}
        >
          {statusEdit === "pending" ? "Đang lưu ..." : "Lưu lại"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Regulation;
