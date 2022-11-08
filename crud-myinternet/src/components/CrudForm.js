import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const initialForm = {
  id: null,
  surname: "",
  name: "",
  phone: "",
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialForm);
    }
  }, [dataToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.surname || !form.name || !form.phone) {
      alert("Datos incompletos");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    setForm(initialForm);
    setDataToEdit(null);
  };

  /*========== STYLES ==========*/

  const inputFormStyle = {
    width: "20rem",
    margin: "1rem",
  };

  const gridInputStyle = {
    display: "flex",
    justifyContent: "center",
  };

  return (
    <div>
      <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          borderRadius: "1rem 1rem 0 0",
        }}
      >
        <Grid container sx={{ padding: "1rem" }}>
          <Grid item xs={6} style={gridInputStyle}>
            <TextField
              style={inputFormStyle}
              name="name"
              label="Nombres"
              variant="outlined"
              onChange={handleChange}
              value={form.name}
            />
          </Grid>
          <Grid item xs={6} style={gridInputStyle}>
            <TextField
              style={inputFormStyle}
              name="surname"
              label="Apellidos"
              variant="outlined"
              onChange={handleChange}
              value={form.surname}
            />
          </Grid>
          <Grid item xs={6} style={gridInputStyle}>
            <TextField
              style={inputFormStyle}
              name="phone"
              label="Teléfono"
              variant="outlined"
              onChange={handleChange}
              value={form.phone}
            />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Button
            style={{ margin: "0 .5rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Enviar
          </Button>
          <Button
            style={{ margin: "0 .5rem" }}
            variant="contained"
            color="secondary"
            type="reset"
            onClick={handleReset}
          >
            Limpiar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CrudForm;
