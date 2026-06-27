import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

function NotificationCard({ notification }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>

        <Typography variant="h6">
          {notification.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1 }}
        >
          {notification.message}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Chip
            label={notification.type}
            color="primary"
          />

          <Chip
            label={notification.priority}
            color="secondary"
          />
        </Stack>

      </CardContent>
    </Card>
  );
}

export default NotificationCard;