import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Box,
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function NotificationCard({ notification }) {

  const getColor = (type) => {
    switch (type) {
      case "Placement":
        return "success";
      case "Result":
        return "warning";
      case "Event":
        return "info";
      default:
        return "default";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "Placement":
        return <WorkIcon />;
      case "Result":
        return <SchoolIcon />;
      case "Event":
        return <EventIcon />;
      default:
        return <EventIcon />;
    }
  };

  return (
    <Card
      elevation={3}
      sx={{
        mb: 2,
        borderLeft: "6px solid #1976d2",
        transition: ".3s",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Stack direction="row" spacing={1} alignItems="center">

            {getIcon(notification.Type)}

            <Typography variant="h6">

              {notification.Type}

            </Typography>

          </Stack>

          <Chip
            label={notification.Type}
            color={getColor(notification.Type)}
          />

        </Stack>

        <Typography
          sx={{
            mt: 2,
            mb: 2,
          }}
        >

          {notification.Message}

        </Typography>

        <Box
          display="flex"
          alignItems="center"
        >

          <AccessTimeIcon
            fontSize="small"
          />

          <Typography
            ml={1}
            variant="body2"
            color="text.secondary"
          >

            {notification.Timestamp}

          </Typography>

        </Box>

      </CardContent>
    </Card>
  );
}

export default NotificationCard;