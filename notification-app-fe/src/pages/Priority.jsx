import { Typography, Container } from "@mui/material";

function Priority() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>

      <Typography>
        Priority notifications will appear here.
      </Typography>
    </Container>
  );
}

export default Priority;