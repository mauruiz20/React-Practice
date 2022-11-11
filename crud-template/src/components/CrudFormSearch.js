import {
  Checkbox,
  Container,
  Fab,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

const CrudFormSearch = ({ inactives, setInactives, search, setSearch }) => {
  const initSearch = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Container className="crud-form-search" maxWidth="xl">
      <Typography
        variant="overline"
        display="block"
        sx={{ fontSize: "2rem", textAlign: "center" }}
      >
        Gestión clientes
      </Typography>

      <hr className="crud-form-search__hr" />

      <form className="crud-form-search__form" onSubmit={handleSubmit}>
        <div className="crud-form-search__container">
          <TextField
            className="crud-form-search__input"
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
            type="submit"
          >
            <Fab color="primary">
              <SearchIcon sx={{ fontSize: "35px" }} />
            </Fab>
          </Tooltip>
        </div>

        <Fab
          variant="extended"
          size="medium"
          color="primary"
          type="submit"
          form="crud-form"
        >
          Agregar cliente
          <AddCircleIcon sx={{ ml: 1 }} />
        </Fab>
      </form>
    </Container>
  );
};

export default CrudFormSearch;
