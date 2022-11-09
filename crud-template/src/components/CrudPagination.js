import { Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";

const CrudPagination = ({ rows, setRows }) => {
  const handleChange = (event) => {
    setRows(event.target.value);
  };

  return (
    <div className="pagination-container">
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="rows-select">Entradas</InputLabel>
          <Select
            labelId="rows-select"
            value={rows}
            label="Entradas"
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Pagination count={10} color="primary" size="large" />
    </div>
  );
};

export default CrudPagination;
