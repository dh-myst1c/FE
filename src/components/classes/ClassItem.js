import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { EditOutlined } from "@mui/icons-material";
import { useRouteMatch, useHistory } from "react-router-dom";
const ClassItem = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const moveToEditClassHandler = () => {
    history.push(`${url}/${props.class.id}?maHK=${props.hk.maHK}`);
  };
  return (
    // <li>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          borderRadius: "16px",
          flex: 1,
          padding: "14px",
          boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, margin: 0, fontSize: "18px" }}
              color="text.primary"
              gutterBottom
            >
              {`Lớp ${props.class.tenLop}`}
            </Typography>
            <Fab
              sx={{ boxShadow: "none" }}
              color="secondary"
              aria-label="edit"
              size="small"
              title="Chỉnh sửa"
              onClick={moveToEditClassHandler}
            >
              <EditOutlined sx={{ color: "#fff" }} />
            </Fab>
          </Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500 }}
            mt="20px"
            color="text.primary"
          >
            {props.class.siSo}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ opacity: "0.7" }}
            color="text.secondary"
          >
            Sĩ số lớp
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    // </li>
  );
};

export default ClassItem;
