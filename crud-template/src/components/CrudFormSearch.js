import {
  Checkbox,
  Fab,
  FormControlLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

const CrudFormSearch = ({ inactives, setInactives }) => {
  return (
    <>
      <form className="crud-form-search">
        <div className="crud-form-search-container">
          <TextField
            className="crud-form-input"
            label="Búsqueda"
            placeholder="Búsqueda"
            variant="outlined"
            type="search"
            name="search"
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={inactives}
                sx={{ margin: "0 0 0 1rem" }}
                onChange={() => setInactives(!inactives)}
              />
            }
            label="Incluir bajas"
            sx={{ userSelect: "none" }}
          />
          <Tooltip
            title="Buscar"
            arrow
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <Fab color="primary">
              <SearchIcon sx={{ fontSize: "35px" }} />
            </Fab>
          </Tooltip>
        </div>

        <Fab variant="extended" size="medium" color="primary">
          Agregar cliente
          <AddCircleIcon sx={{ ml: 1 }} />
        </Fab>
      </form>
    </>
  );
};

export default CrudFormSearch;
