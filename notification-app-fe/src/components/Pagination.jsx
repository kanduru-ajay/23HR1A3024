import { Pagination, Stack } from "@mui/material";

function PaginationComponent({
  count,
  page,
  onChange,
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        mt: 4,
        mb: 4,
        alignItems: "center",
      }}
    >
      <Pagination
        count={count}
        page={page}
        color="primary"
        onChange={(_, value) => onChange(value)}
      />
    </Stack>
  );
}

export default PaginationComponent;