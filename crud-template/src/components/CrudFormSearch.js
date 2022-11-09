import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

const CrudFormSearch = () => {
  return (
    <>
      <form>
        <TextField
          className="crud-form-input"
          label="Busqueda"
          variant="outlined"
          type="search"
          name="search"
        />
        <Checkbox defaultChecked />
        <IconButton color="primary">
          <SearchIcon sx={{ fontSize: "45px" }} />
        </IconButton>
        <IconButton color="primary">
          <AddCircleIcon sx={{ fontSize: "45px" }} />
        </IconButton>
      </form>
    </>
  );
};

export default CrudFormSearch;
