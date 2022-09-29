import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";

export default function SearchFiel() {
  return (
    <Box sx={{ width: "80%" }}>
      <Autocomplete
        freeSolo
        options={top100Films.map((option) => option.title)}
        size={"medium"}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth={true}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Box>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  
];
