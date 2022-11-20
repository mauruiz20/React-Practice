import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import CrudContext from '../context/CrudContext';

const CrudForm = ({ openForm, setOpenForm }) => {
  const [addMultiple, setAddMultiple] = useState(false);
  const { createData, updateData, dataToEdit, setDataToEdit } =
    useContext(CrudContext);

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
      state: 'A',
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

  const onSubmit = data => {
    if (getValues().id === null) {
      createData(data);
      handleReset();
      setOpenForm(addMultiple);
    } else {
      updateData(data);
    }
  };

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

  const handleAddMultiple = evt => {
    setAddMultiple(evt.target.checked);
  };

  const handleClose = () => {
    setOpenForm(false);
    handleReset();
    setAddMultiple(false);
  };

  return (
    <>
      <Dialog
        open={openForm}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle
          id='form-dialog-title'
          variant='overline'
          display='block'
          color='text.primary'
          sx={{
            width: '600px',
            fontSize: '1.4rem',
            lineHeight: '1.4rem',
            paddingTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          {dataToEdit ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>
        <DialogContent>
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
                variant='standard'
                type='text'
                autoFocus
                fullWidth
                name='surname'
                size='small'
                color='info'
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
                variant='standard'
                type='text'
                fullWidth
                name='name'
                size='small'
                color='info'
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
                variant='standard'
                type='email'
                fullWidth
                name='email'
                size='small'
                color='info'
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
                variant='standard'
                type='text'
                fullWidth
                name='phone'
                size='small'
                color='info'
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
                variant='standard'
                type='text'
                fullWidth
                name='address'
                size='small'
                color='info'
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
                variant='standard'
                fullWidth
                size='small'
                color='info'
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
                variant='standard'
                type='text'
                fullWidth
                name='nacionality'
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.nacionality ? true : false}
                helperText={
                  errors.nacionality ? errors.nacionality.message : ' '
                }
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'space-between', padding: '1.25rem' }}
        >
          <Button onClick={handleClose} variant='contained' color='neutral'>
            Cancelar
          </Button>

          <Box>
            {!dataToEdit && (
              <Tooltip title='Agregar múltiples clientes' placement='left'>
                <Switch
                  checked={addMultiple}
                  onChange={handleAddMultiple}
                  value='addMultiple'
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Tooltip>
            )}
            <Button
              type='submit'
              form='crud-form'
              variant='contained'
              color='primary'
            >
              {dataToEdit ? 'Editar Cliente' : 'Agregar Cliente'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CrudForm;
