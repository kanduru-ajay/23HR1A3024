import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function NotificationFilter({ value, onChange }) {

  return (

    <FormControl
      sx={{
        width: 220,
      }}
    >

      <InputLabel>

        Filter

      </InputLabel>

      <Select
        value={value}
        label="Filter"
        onChange={(e) => onChange(e.target.value)}
      >

        <MenuItem value="">
          All Notifications
        </MenuItem>

        <MenuItem value="Placement">
          Placement
        </MenuItem>

        <MenuItem value="Result">
          Result
        </MenuItem>

        <MenuItem value="Event">
          Event
        </MenuItem>

      </Select>

    </FormControl>

  );

}

export default NotificationFilter;