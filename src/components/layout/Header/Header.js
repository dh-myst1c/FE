import React from "react";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

import Menu from "@mui/material/Menu";

import Divider from "@mui/material/Divider";

import { PersonOutlined, VpnKeyOutlined } from "@mui/icons-material";
import useHttp from "../../../hooks/use-http";
import { logout } from "../../../lib/api";
import EditProfileForm from "../../profile/EditProfileForm";
import EditPasswordForm from "../../profile/EditPasswordForm";
import swal from "sweetalert";

const Header = (props) => {
  const { sendRequest, data, status, error } = useHttp(logout);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditProfileDialogVisible, setIsEditProfileDialogVisible] =
    React.useState(false);
  const [isEditPasswordDialogVisible, setIsEditPasswordDialogVisible] =
    React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const showEditPasswordHandler = () => {
    setIsEditPasswordDialogVisible(true);
  };
  const hideEditPasswordHandler = () => {
    setIsEditPasswordDialogVisible(false);
  };
  const showEditProfileHandler = () => {
    setIsEditProfileDialogVisible(true);
  };
  const hideEditProfileHandler = () => {
    setIsEditProfileDialogVisible(false);
  };
  React.useEffect(() => {
    if (status === "completed") {
      if (data) {
        window.location.reload();
      } else if (error) swal("Đã có lỗi xảy ra", error, "error");
    }
  }, [data, error, status, props]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ backgroundColor: "#fafbfb", boxShadow: "none" }}
        position="static"
      >
        <Toolbar sx={{ color: "#949db2" }} variant="dense">
          <Avatar
            onClick={handleClick}
            aria-describedby={id}
            sx={{ ml: "auto", padding: 0, cursor: "pointer" }}
            alt="Avatar"
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                p: 2,
                pr: 6,
                pl: 6,
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 90,
                  height: 90,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Stack spacing={2}>
              <Typography variant="h6">Cá nhân</Typography>
              <Stack mt={2} direction="row">
                <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />{" "}
                <Stack direction="column" sx={{ minWidth: "200px" }}>
                  <Typography variant="h6">{props.user.name}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {props.user.maNhom === 1
                      ? "Admin"
                      : props.user.maNhom === 2
                      ? "Hiệu trưởng"
                      : "Giáo vụ"}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {props.user.email}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack
                sx={{
                  cursor: "pointer",
                  "&:hover": { background: "rgba(0, 0, 0, 0.03)" },
                  borderRadius: "4",
                }}
                spacing={2}
                mt={2}
                pl={2}
                pr={2}
                direction="row"
                alignItems="center"
                onClick={showEditProfileHandler}
              >
                <Box
                  sx={{
                    background: "#E6F4FF",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    minWidth: "45px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <PersonOutlined />
                </Box>

                <Stack
                  direction="column"
                  sx={{
                    minWidth: "200px",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                    Thông tin của tôi
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Chỉnh sửa thông tin
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  cursor: "pointer",
                  "&:hover": { background: "rgba(0, 0, 0, 0.03)" },
                  borderRadius: "4",
                }}
                spacing={2}
                mt={2}
                pl={2}
                pr={2}
                direction="row"
                alignItems="center"
                onClick={showEditPasswordHandler}
              >
                <Box
                  sx={{
                    background: "#E6F4FF",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    minWidth: "45px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <VpnKeyOutlined />
                </Box>

                <Stack
                  direction="column"
                  sx={{
                    minWidth: "200px",
                  }}
                >
                  <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
                    Bảo mật
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Thay đổi mật khẩu
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Button
                mt={2}
                fullWidth
                variant="contained"
                onClick={() => {
                  sendRequest();
                  // localStorage.removeItem("accessToken");
                  // window.location.reload();
                }}
              >
                Đăng xuất
              </Button>
            </Stack>
          </Menu>
        </Toolbar>
      </AppBar>
      {isEditProfileDialogVisible && (
        <EditProfileForm
          editProfile={props.user}
          open={isEditProfileDialogVisible}
          onClose={hideEditProfileHandler}
          onReload={props.onReload}
        />
      )}
      {isEditPasswordDialogVisible && (
        <EditPasswordForm
          editUser={props.user}
          open={isEditPasswordDialogVisible}
          onClose={hideEditPasswordHandler}
        />
      )}
    </Box>
  );
};

export default Header;
