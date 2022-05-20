import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Chip } from "@mui/material";

function ContainerTable() {
  return <Paper />;
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", borderTop: "unset" },
          borderTop: "unset",
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.tenHK}
        </TableCell>
        <TableCell align="center">{row.tenLop}</TableCell>
        <TableCell align="center">{row.diemTB}</TableCell>
        <TableCell align="center">
          <Chip
            sx={{ color: "#fff" }}
            label={row.hanhKiem}
            color={
              row.hanhKiem === "Tốt"
                ? "success"
                : row.hanhKiem === "Khá"
                ? "secondary"
                : row.hanhKiem === "Trung bình"
                ? "warning"
                : "error"
            }
            variant="contained"
          />
        </TableCell>
        <TableCell align="center">
          {
            <Chip
              sx={{ color: "#fff" }}
              label={row.hocLuc}
              color={
                row.hocLuc === "Giỏi"
                  ? "success"
                  : row.hocLuc === "Khá"
                  ? "secondary"
                  : row.hocLuc === "Trung bình"
                  ? "warning"
                  : "error"
              }
              variant="contained"
            />
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Điểm số
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Môn học</TableCell>
                    <TableCell>Điểm miệng</TableCell>
                    <TableCell align="right">Điểm 15 phút</TableCell>
                    <TableCell align="right">Điểm 1 tiết</TableCell>
                    <TableCell align="right">Điểm học kỳ</TableCell>
                    <TableCell align="right">Trung bình</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.bangDiem.map((row) => (
                    <TableRow key={row.maBD}>
                      <TableCell component="th" scope="row">
                        {row.tenMH}
                      </TableCell>
                      <TableCell>{row.diemMieng}</TableCell>
                      <TableCell align="right">{row.diem15P}</TableCell>
                      <TableCell align="right">{row.diem1Tiet}</TableCell>
                      <TableCell align="right">{row.diemHK}</TableCell>
                      <TableCell align="right">{row.diemTBM}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function QuaTrinhHocTable(props) {
  return (
    <TableContainer component={Box}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Học kỳ</TableCell>
            <TableCell align="center">Lớp</TableCell>
            <TableCell align="center">Điểm trung bình</TableCell>
            <TableCell align="center">Hạnh kiểm</TableCell>
            <TableCell align="center">Học lực</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.qth.map((row) => (
            <Row key={row.tenHK} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
