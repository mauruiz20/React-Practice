import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CrudContext from '../context/CrudContext';
import { Box } from '@mui/system';
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

const CrudForm = ({ openForm, setOpenForm }) => {
  const { createData, updateData, dataToEdit, setDataToEdit } =
    useContext(CrudContext);
  const [addMultiple, setAddMultiple] = useState(false);

  /* React Hook Form */

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

  /* Fields control */

  const messages = {
    required: 'Campo obligatorio',
    onlyAlphabetic: 'Solo se acepta letras y espacios en blanco',
    email: 'Correo incorrecto',
  };

  const patterns = {
    onlyAlphabetic: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
    email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
  };

  /* Edit mode => fill fields with data */

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

  /* Submit form */

  const onSubmit = data => {
    if (getValues().id === null) {
      // ID == null => create data
      createData(data);
      handleReset();
      setOpenForm(addMultiple);
    } else {
      // ID != null => update data
      updateData(data);
    }
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

  /* Close form */

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
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle
          id='form-dialog-title'
          variant='overline'
          display='block'
          color='text.primary'
          className='crud-form__dialog-title'
        >
          {dataToEdit ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>

        <DialogContent dividers>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='crud-form__container'
            id='crud-form'
          >
            <Box>
              <InputLabel
                htmlFor='surname'
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

            <Box>
              <InputLabel htmlFor='name' error={errors.name ? true : false}>
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

            <Box>
              <InputLabel htmlFor='email' error={errors.email ? true : false}>
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

            <Box>
              <InputLabel htmlFor='phone' error={errors.phone ? true : false}>
                Teléfono:
              </InputLabel>
              <TextField
                {...register('phone', {
                  required: true,
                })}
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

            <Box>
              <InputLabel
                htmlFor='address'
                error={errors.address ? true : false}
              >
                Dirección:
              </InputLabel>
              <TextField
                {...register('address', {
                  required: messages.required,
                })}
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

            <Box>
              <InputLabel htmlFor='date' error={errors.date ? true : false}>
                Fecha de nacimiento:
              </InputLabel>
              <TextField
                {...register('date', {
                  required: messages.required,
                })}
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

            <Box>
              <InputLabel
                htmlFor='nacionality'
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

        <DialogActions className='crud-form__dialog-actions'>
          <Button
            className='crud-form__btn'
            onClick={handleClose}
            variant='contained'
            color='neutral'
          >
            Cancelar
          </Button>

          <Box>
            {!dataToEdit && (
              <Tooltip title='Agregar múltiples clientes' placement='left'>
                <Switch
                  checked={addMultiple}
                  onChange={evt => setAddMultiple(evt.target.checked)}
                  value='addMultiple'
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
              </Tooltip>
            )}

            <Button
              className='crud-form__btn'
              type='submit'
              form='crud-form'
              variant='contained'
              color='primary'
            >
              {dataToEdit ? 'Editar' : 'Agregar'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CrudForm;
