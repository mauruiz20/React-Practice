import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useForm } from "../hooks/useForm";

const initialForm = {
  surname: "",
  name: "",
  email: "",
  phone: "",
  date: "",
  address: "",
  nacionality: "",
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
  // let regexComments = /^.{1,255}$/;

  if (!form.surname.trim()) {
    errors.surname = "Campo obligatorio";
  } else if (!regexName.test(form.surname.trim())) {
    errors.surname = "Solo se acepta letras y espacios en blanco";
  }

  if (!form.name.trim()) {
    errors.name = "Campo obligatorio";
  } else if (!regexName.test(form.name.trim())) {
    errors.name = "Solo se acepta letras y espacios en blanco";
  }

  if (!form.email.trim()) {
    errors.email = "Campo obligatorio";
  } else if (!regexEmail.test(form.email.trim())) {
    errors.email = "El correo es incorrecto";
  }

  if (!form.phone.trim()) {
    errors.phone = "Campo obligatorio";
  }

  if (!form.date.trim()) {
    errors.date = "Campo obligatorio";
  }

  if (!form.address.trim()) {
    errors.address = "Campo obligatorio";
  }

  if (!form.nacionality.trim()) {
    errors.nacionality = "Campo obligatorio";
  }

  return errors;
};

const CrudForm = () => {
  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(
    initialForm,
    validationsForm
  );
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
            placeholder="Apellidos"
            variant="outlined"
            type="text"
            name="surname"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.surname}
            required
            error={errors.surname ? true : false}
            helperText={errors.surname}
          />

          <TextField
            className="crud-form-input"
            label="Nombres"
            placeholder="Nombres"
            variant="outlined"
            type="text"
            name="name"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.name}
            required
            error={errors.name ? true : false}
            helperText={errors.name}
          />

          <TextField
            className="crud-form-input"
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            variant="outlined"
            type="email"
            name="email"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.email}
            required
            error={errors.email ? true : false}
            helperText={errors.email}
          />

          <TextField
            className="crud-form-input"
            label="Teléfono"
            placeholder="Teléfono"
            variant="outlined"
            type="text"
            name="phone"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.phone}
            required
            error={errors.phone ? true : false}
            helperText={errors.phone}
          />

          <TextField
            className="crud-form-input"
            label="Nacimiento"
            placeholder="Nacimiento"
            variant="outlined"
            type="text"
            name="date"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.date}
            required
            error={errors.date ? true : false}
            helperText={errors.date}
          />

          <TextField
            className="crud-form-input"
            label="Dirección"
            placeholder="Dirección"
            variant="outlined"
            type="text"
            name="address"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.address}
            required
            error={errors.address ? true : false}
            helperText={errors.address}
          />

          <TextField
            className="crud-form-input"
            label="Nacionalidad"
            placeholder="Nacionalidad"
            variant="outlined"
            type="text"
            name="nacionality"
            size="small"
            onBlur={handleBlur}
            onChange={handleChange}
            value={form.nacionality}
            required
            error={errors.nacionality ? true : false}
            helperText={errors.nacionality}
          />
        </form>
        <hr className="crud-form-hr" />

        <div className="crud-form-btn-container">
          <Button
            className="crud-form-btn"
            variant="contained"
            color="error"
            onClick={handleSubmit}
          >
            Cancelar
          </Button>
          <Button
            className="crud-form-btn"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Enviar
          </Button>
        </div>
      </Container>
    </>
  );
};

export default CrudForm;
