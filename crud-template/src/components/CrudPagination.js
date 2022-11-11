import { Pagination, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import datos from "../api/db.json";
import React from "react";

const CrudPagination = ({ rows, setRows, page, setPage }) => {
  const matches768 = useMediaQuery("(min-width: 769px)");

  const handleChange = (e) => {
    setRows(e.target.value);
    setPage(1);
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  return (
    <div className="pagination">
      <Box sx={{ minWidth: 100 }}>
        <FormControl className="pagination__rows" size="small">
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
      <Pagination
        className="pagination__nav"
        count={parseInt(datos.clientes.length / rows)}
        color="primary"
        size={!matches768 ? "medium" : "large"}
        page={page}
        onChange={handlePage}
      />
    </div>
  );
};

export default CrudPagination;
