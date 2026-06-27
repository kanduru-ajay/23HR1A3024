import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

function Filter({ value, onChange }) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Notification Type</InputLabel>

      <Select
        value={value}
        label="Notification Type"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Placement">Placement</MenuItem>
        <MenuItem value="Event">Event</MenuItem>
        <MenuItem value="Reminder">Reminder</MenuItem>
        <MenuItem value="Result">Result</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Filter;