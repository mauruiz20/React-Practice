import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const CrudForm = () => {
  return (
    <>
      <Container className="crud-form-container">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Crud Form
        </Typography>
        <form className="crud-form">
          <TextField
            className="crud-form-input"
            label="Apellidos"
            variant="outlined"
            type="text"
            name="surname"
          />
          <TextField
            className="crud-form-input"
            label="Nombres"
            variant="outlined"
            type="text"
            name="name"
          />
          <TextField
            className="crud-form-input"
            label="Correo Electrónico"
            variant="outlined"
            type="email"
            name="email"
          />
          <TextField
            className="crud-form-input"
            label="Teléfono"
            variant="outlined"
            type="text"
            name="phone"
          />
          <TextField
            className="crud-form-input"
            label="Nacimiento"
            variant="outlined"
            type="text"
            name="date"
          />
          <TextField
            className="crud-form-input"
            label="Dirección"
            variant="outlined"
            type="text"
            name="address"
          />
          <TextField
            className="crud-form-input"
            label="Nacionalidad"
            variant="outlined"
            type="text"
            name="nacionality"
          />
          <Button variant="contained" color="primary">
            Enviar
          </Button>
          <Button variant="contained" color="secondary">
            Cancelar
          </Button>
        </form>
      </Container>
    </>
  );
};

export default CrudForm;
