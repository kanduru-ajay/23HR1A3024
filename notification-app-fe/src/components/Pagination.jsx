import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function PaginationComponent({
  page,
  count,
  onChange,
}) {

  return (

    <Stack
      mt={4}
      alignItems="center"
    >

      <Pagination
        page={page}
        count={count}
        color="primary"
        onChange={(e, value) => onChange(value)}
      />

    </Stack>

  );

}

export default PaginationComponent;