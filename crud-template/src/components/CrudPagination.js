import React, { useContext } from "react";
import CrudContext from "../context/CrudContext";
import { Pagination } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CrudPagination = () => {
  const { db, rows, setRows, page, setPage, mediaQ768 } =
    useContext(CrudContext);

  const totalRows = db.length;

  const handleChange = (e) => {
    setRows(e.target.value);
    setPage(1);
  };

  const handlePage = (e, value) => {
    setPage(value);
  };

  return (
    <div className="pagination">
      <div className="pagination__container">
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
        <div className="pagination__msg">
          {`Mostrando ${page * rows - rows + 1} - ${
            page * rows < totalRows ? page * rows : totalRows
          } de ${totalRows}`}
        </div>
      </div>

      {totalRows > rows && (
        <Pagination
          className="pagination__nav"
          count={parseInt(Math.ceil(totalRows / rows))}
          color="primary"
          size={!mediaQ768 ? "medium" : "large"}
          page={page}
          onChange={handlePage}
        />
      )}
    </div>
  );
};

export default CrudPagination;
