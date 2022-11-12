import React, { useEffect, useContext } from "react";
import CrudContext from "../context/CrudContext";

import { useForm } from "react-hook-form";
import { Button, TextField, Typography } from "@mui/material";

const CrudForm = () => {
  const { createData, updateData, dataToEdit, setDataToEdit } =
    useContext(CrudContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      id: null,
      surname: "",
      name: "",
      email: "",
      phone: "",
      date: "",
      address: "",
      nacionality: "",
    },
  });

  useEffect(() => {
    if (dataToEdit) {
      setValue("id", dataToEdit.id);
      setValue("surname", dataToEdit.surname, { shouldValidate: true });
      setValue("name", dataToEdit.name, { shouldValidate: true });
      setValue("email", dataToEdit.email, { shouldValidate: true });
      setValue("phone", dataToEdit.phone, { shouldValidate: true });
      setValue("address", dataToEdit.address, { shouldValidate: true });
      setValue("date", dataToEdit.date, {
        shouldValidate: true,
      });
      setValue("nacionality", dataToEdit.nacionality, { shouldValidate: true });
    }
  }, [dataToEdit, setValue]);

  const onSubmit = (data) => {
    if (getValues().id === null) {
      createData(data);
    } else {
      updateData(data);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setValue("id", null);
    resetField("surname", { keepErrors: false });
    resetField("name", { keepErrors: false });
    resetField("email", { keepErrors: false });
    resetField("phone", { keepErrors: false });
    resetField("address", { keepErrors: false });
    resetField("date", { keepErrors: false });
    resetField("nacionality", { keepErrors: false });
    setDataToEdit(null);
  };

  return (
    <div className="crud-form">
      <Typography
        variant="overline"
        display="block"
        sx={{ fontSize: "2rem", textAlign: "center", lineHeight: "4rem" }}
      >
        {dataToEdit ? "Editar Cliente" : "Agregar Cliente"}
      </Typography>

      <hr className="crud-form__hr" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="crud-form__container"
        id="crud-form"
      >
        <TextField
          {...register("surname", {
            required: true,
            pattern: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
          })}
          className="crud-form__input"
          id="mau"
          label="Apellidos"
          placeholder="Apellidos"
          variant="outlined"
          type="text"
          name="surname"
          size="small"
          InputLabelProps={{ shrink: !!watch("surname") }}
          error={errors.surname ? true : false}
          helperText={
            errors.surname?.type === "required"
              ? "Campo obligatorio"
              : errors.surname?.type === "pattern"
              ? "Solo se acepta letras y espacios en blanco"
              : " "
          }
        />

        <TextField
          {...register("name", {
            required: true,
            pattern: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
          })}
          className="crud-form__input"
          label="Nombres"
          placeholder="Nombres"
          variant="outlined"
          type="text"
          name="name"
          size="small"
          InputLabelProps={{ shrink: !!watch("name") }}
          error={errors.name ? true : false}
          helperText={
            errors.name?.type === "required"
              ? "Campo obligatorio"
              : errors.name?.type === "pattern"
              ? "Solo se acepta letras y espacios en blanco"
              : " "
          }
        />

        <TextField
          {...register("email", {
            required: true,
            pattern: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
          })}
          className="crud-form__input"
          label="Correo electrónico"
          placeholder="Correo electrónico"
          variant="outlined"
          type="email"
          name="email"
          size="small"
          InputLabelProps={{ shrink: !!watch("email") }}
          error={errors.email ? true : false}
          helperText={
            errors.email?.type === "required"
              ? "Campo obligatorio"
              : errors.email?.type === "pattern"
              ? "Correo incorrecto"
              : " "
          }
        />

        <TextField
          {...register("phone", {
            required: true,
          })}
          className="crud-form__input"
          label="Teléfono"
          placeholder="Teléfono"
          variant="outlined"
          type="text"
          name="phone"
          size="small"
          InputLabelProps={{ shrink: !!watch("phone") }}
          error={errors.phone ? true : false}
          helperText={
            errors.phone?.type === "required" ? "Campo obligatorio" : " "
          }
        />

        <TextField
          {...register("address", {
            required: true,
          })}
          className="crud-form__input"
          label="Dirección"
          placeholder="Dirección"
          variant="outlined"
          type="text"
          name="address"
          size="small"
          InputLabelProps={{ shrink: !!watch("address") }}
          error={errors.address ? true : false}
          helperText={
            errors.address?.type === "required" ? "Campo obligatorio" : " "
          }
        />

        <TextField
          {...register("date", {
            required: true,
          })}
          className="crud-form__input-date"
          label="Nacimiento"
          type="date"
          size="small"
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.date ? true : false}
          helperText={
            errors.date?.type === "required" ? "Campo obligatorio" : " "
          }
        />
        <TextField
          {...register("nacionality", {
            required: true,
          })}
          className="crud-form__input"
          label="Nacionalidad"
          placeholder="Nacionalidad"
          variant="outlined"
          type="text"
          name="nacionality"
          size="small"
          InputLabelProps={{ shrink: !!watch("nacionality") }}
          error={errors.nacionality ? true : false}
          helperText={
            errors.nacionality?.type === "required" ? "Campo obligatorio" : " "
          }
        />
      </form>
      <hr className="crud-form__hr" />
      <div className="crud-form__btn-container">
        <Button
          className="crud-form__btn"
          variant="contained"
          color="error"
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          className="crud-form__btn"
          variant="contained"
          color="primary"
          type="submit"
          form="crud-form"
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default CrudForm;
