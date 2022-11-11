import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";

export default function CurdForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);

  const handleCancel = (e) => {
    resetField("surname", { keepErrors: false });
    resetField("name", { keepErrors: false });
    resetField("email", { keepErrors: false });
    resetField("phone", { keepErrors: false });
    resetField("address", { keepErrors: false });
    resetField("date", { keepErrors: false });
    resetField("nacionality", { keepErrors: false });
  };

  return (
    <Container className="crud-form">
      <Typography
        variant="overline"
        display="block"
        sx={{ fontSize: "2rem", textAlign: "center" }}
      >
        Agregar Cliente
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
          label="Apellidos"
          placeholder="Apellidos"
          variant="outlined"
          type="text"
          name="surname"
          size="small"
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
    </Container>
  );
}
