import React from "react";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";

import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
const QuaTrinhCard = () => {
  return (
    <Paper elevation={4} sx={{ borderRadius: 4, padding: 2 }}>
      <Stack
        // color="#fff"
        sx={{}}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight={500} variant="subtitle1" component="p">
          Học kỳ 1 2020 - 2021
        </Typography>
        <Typography variant="subtitle1" component="p">
          Lớp 10A1
        </Typography>
        <Typography variant="subtitle1">Hạnh kiểm: Tốt</Typography>
        <Typography variant="subtitle1">Điểm trung bình: 9</Typography>
        <Typography variant="subtitle1">Học lực: Giỏi</Typography>
        <IconButton>
          <ArrowUpward />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default QuaTrinhCard;
