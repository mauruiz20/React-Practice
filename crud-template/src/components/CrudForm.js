import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CrudContext from '../context/CrudContext';
import { useForm } from 'react-hook-form';
import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const CrudForm = () => {
  const { createData, updateData, dataToEdit, setDataToEdit } =
    useContext(CrudContext);

  /* useForm is a custom hook for managing forms with ease */

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      id: null,
      surname: '',
      name: '',
      email: '',
      phone: '',
      date: '',
      address: '',
      nacionality: '',
    },
  });

  const messages = {
    required: 'Campo obligatorio',
    onlyAlphabetic: 'Solo se acepta letras y espacios en blanco',
    email: 'Correo incorrecto',
  };

  const patterns = {
    onlyAlphabetic: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
    email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
  };

  /* dataToEdit = true => Edit client */

  useEffect(() => {
    if (dataToEdit) {
      setValue('id', dataToEdit.id);
      setValue('surname', dataToEdit.surname, { shouldValidate: true });
      setValue('name', dataToEdit.name, { shouldValidate: true });
      setValue('email', dataToEdit.email, { shouldValidate: true });
      setValue('phone', dataToEdit.phone, { shouldValidate: true });
      setValue('address', dataToEdit.address, { shouldValidate: true });
      setValue('date', dataToEdit.date, { shouldValidate: true });
      setValue('nacionality', dataToEdit.nacionality, { shouldValidate: true });
    }
  }, [dataToEdit, setValue]);

  /* Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them */

  const onSubmit = data => {
    if (getValues().id === null) {
      createData(data);
      handleReset();
    } else {
      updateData(data);
    }
  };

  /* useNavigate hook returns a function that lets navigate programmatically */

  const navigate = useNavigate();

  /* Return to the main page and reset form */

  const handleReturn = () => {
    handleReset();
    navigate('/');
  };

  /* Reset form */

  const handleReset = () => {
    setValue('id', null);
    resetField('surname', { keepErrors: false });
    resetField('name', { keepErrors: false });
    resetField('email', { keepErrors: false });
    resetField('phone', { keepErrors: false });
    resetField('address', { keepErrors: false });
    resetField('date', { keepErrors: false });
    resetField('nacionality', { keepErrors: false });
    setDataToEdit(null);
  };

  return (
    <div className='crud-form'>
      <Typography
        variant='overline'
        display='block'
        sx={{
          fontSize: '2rem',
          textAlign: 'center',
          lineHeight: '4rem',
        }}
      >
        {dataToEdit ? 'Editar Cliente' : 'Agregar Cliente'}
      </Typography>

      <hr className='crud-form__hr' />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='crud-form__container'
        id='crud-form'
      >
        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='surname'
            className='crud-form__label'
            error={errors.surname ? true : false}
          >
            Apellidos:
          </InputLabel>
          <TextField
            {...register('surname', {
              required: messages.required,
              pattern: {
                value: patterns.onlyAlphabetic,
                message: messages.onlyAlphabetic,
              },
            })}
            className='crud-form__input'
            variant='outlined'
            type='text'
            name='surname'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.surname ? true : false}
            helperText={errors.surname ? errors.surname.message : ' '}
          />
        </Box>

        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='name'
            className='crud-form__label'
            error={errors.name ? true : false}
          >
            Nombres:
          </InputLabel>
          <TextField
            {...register('name', {
              required: messages.required,
              pattern: {
                value: patterns.onlyAlphabetic,
                message: messages.onlyAlphabetic,
              },
            })}
            className='crud-form__input'
            variant='outlined'
            type='text'
            name='name'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.name ? true : false}
            helperText={errors.name ? errors.name.message : ' '}
          />
        </Box>

        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='email'
            className='crud-form__label'
            error={errors.email ? true : false}
          >
            Correo electrónico:
          </InputLabel>
          <TextField
            {...register('email', {
              required: messages.required,
              pattern: {
                value: patterns.email,
                message: messages.email,
              },
            })}
            className='crud-form__input'
            variant='outlined'
            type='email'
            name='email'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email.message : ' '}
          />
        </Box>

        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='phone'
            className='crud-form__label'
            error={errors.phone ? true : false}
          >
            Teléfono:
          </InputLabel>
          <TextField
            {...register('phone', {
              required: true,
            })}
            className='crud-form__input'
            variant='outlined'
            type='text'
            name='phone'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.phone ? true : false}
            helperText={errors.phone ? errors.phone.message : ' '}
          />
        </Box>

        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='address'
            className='crud-form__label'
            error={errors.address ? true : false}
          >
            Dirección:
          </InputLabel>
          <TextField
            {...register('address', {
              required: messages.required,
            })}
            className='crud-form__input'
            variant='outlined'
            type='text'
            name='address'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.address ? true : false}
            helperText={errors.address ? errors.address.message : ' '}
          />
        </Box>

        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='date'
            className='crud-form__label'
            error={errors.date ? true : false}
          >
            Fecha de nacimiento:
          </InputLabel>
          <TextField
            {...register('date', {
              required: messages.required,
            })}
            className='crud-form__input-date'
            type='date'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.date ? true : false}
            helperText={errors.date ? errors.date.message : ' '}
          />
        </Box>
        <Box className='crud-form__item'>
          <InputLabel
            htmlFor='nacionality'
            className='crud-form__label'
            error={errors.nacionality ? true : false}
          >
            Nacionalidad
          </InputLabel>
          <TextField
            {...register('nacionality', {
              required: messages.required,
              pattern: {
                value: patterns.onlyAlphabetic,
                message: messages.onlyAlphabetic,
              },
            })}
            className='crud-form__input'
            variant='outlined'
            type='text'
            name='nacionality'
            size='small'
            color='blue'
            autoComplete='off'
            InputLabelProps={{ shrink: true }}
            error={errors.nacionality ? true : false}
            helperText={errors.nacionality ? errors.nacionality.message : ' '}
          />
        </Box>
      </form>
      <hr className='crud-form__hr' />
      <div className='crud-form__btn-container'>
        <Button
          className='crud-form__btn'
          variant='contained'
          color='neutral'
          onClick={handleReturn}
        >
          Volver
        </Button>

        <Button
          className='crud-form__btn'
          variant='contained'
          color='primary'
          type='submit'
          form='crud-form'
        >
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default CrudForm;
