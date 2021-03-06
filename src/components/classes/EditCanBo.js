import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";

import swal from "sweetalert";
import useHttp from "../../hooks/use-http";
import { editCanBoLop, getTeachersEmptyHK } from "../../lib/api";
import LinearLoading from "../UI/LinearLoading";
import BackdropLoading from "../UI/BackdropLoading";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditCanBo = (props) => {
  const { sendRequest, status, error, data } = useHttp(
    getTeachersEmptyHK,
    true
  );
  React.useEffect(() => {
    sendRequest(props.maHK);
  }, [sendRequest, props.maHK]);
  if (status === "pending") return <BackdropLoading />;
  if (error) return <p>{error}</p>;
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <EditCanBoContent
        students={props.students}
        teachers={data}
        onClose={props.onClose}
        maLop={props.maLop}
        maHK={props.maHK}
        onEditCanBo={props.onEditCanBo}
      />
    </Dialog>
  );
};

const EditCanBoContent = (props) => {
  const { sendRequest, status, error, data } = useHttp(editCanBoLop);
  const editCanBoSubmitHandler = (event) => {
    event.preventDefault();
    sendRequest({
      maLop: props.maLop,
      maHK: props.maHK,
      maGVCN: chuNhiem.maGV,
      maLT: lopTruong.maHS,
    });
  };
  const [lopTruong, setLopTruong] = React.useState(null);
  const changeLopTruongHandler = (event, value) => {
    setLopTruong(value);
  };
  const [chuNhiem, setChuNhiem] = React.useState(null);
  const changeChuNhiemHandler = (event, value) => {
    setChuNhiem(value);
  };
  React.useEffect(() => {
    if (status === "completed") {
      props.onClose();
      console.log(data);
      if (data) {
        swal(
          "C???p nh???t th??nh c??ng!",
          "B???n ???? c???p nh???t th??ng tin qu???n l?? l???p th??nh c??ng",
          "success"
        );
        if (chuNhiem != null && lopTruong != null)
          props.onEditCanBo({
            tenGVCN: chuNhiem.hoTen,
            tenLT: lopTruong.hoTen,
          });
      } else if (error) swal("???? c?? l???i x???y ra", error, "error");
    }
  }, [data, error, status, props, chuNhiem, lopTruong]);
  return (
    <form onSubmit={editCanBoSubmitHandler}>
      {status === "pending" && <LinearLoading />}
      <DialogTitle>Thay ?????i th??ng tin qu???n l?? l???p</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Autocomplete
            sx={{ padding: "8px 0" }}
            onChange={changeLopTruongHandler}
            value={lopTruong}
            id="students"
            options={props.students}
            getOptionLabel={(option) => option.hoTen}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`${option.hoTen} (${option.maHS})`}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Danh s??ch h???c sinh"
                placeholder="L???p tr?????ng"
              />
            )}
          />
          <Autocomplete
            sx={{ padding: "8px 0" }}
            onChange={changeChuNhiemHandler}
            value={chuNhiem}
            id="students"
            options={props.teachers}
            getOptionLabel={(option) => option.hoTen}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.id}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`${option.hoTen} (${option.maGV})`}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Danh s??ch gi??o vi??n"
                placeholder="Gi??o vi??n ch??? nhi???m"
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={status === "pending"}
          type="submit"
          variant="contained"
        >
          {status === "pending" ? "??ang l??u..." : "X??c nh???n"}
        </Button>
        <Button onClick={props.onClose}>H???y b???</Button>
      </DialogActions>
    </form>
  );
};

export default EditCanBo;
