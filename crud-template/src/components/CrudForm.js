import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const CrudForm = () => {
  return (
    <>
      <Container className="crud-form-container">
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Gestión de Clientes
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
        </form>
        <hr className="crud-form-hr" />

        <div className="crud-form-btn-container">
          <Button className="crud-form-btn" variant="contained" color="error">
            Cancelar
          </Button>
          <Button className="crud-form-btn" variant="contained" color="primary">
            Enviar
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CrudForm;
