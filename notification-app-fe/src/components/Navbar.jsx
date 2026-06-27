import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={2}
    >
      <Toolbar>

        <NotificationsActiveIcon
          sx={{
            mr: 2,
            fontSize: 35,
          }}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          AffordMed Notification System
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Avatar
          sx={{
            bgcolor: "#fff",
            color: "#1565c0",
            mr: 2,
          }}
        >
          S
        </Avatar>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 600,
          }}
        >
          Student Portal
        </Typography>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;