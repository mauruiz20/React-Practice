import React, { useEffect, useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';
import { useForm } from 'react-hook-form';
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
  Box,
} from '@mui/material';

const CrudForm = () => {
  const {
    createData,
    updateData,
    dataToEdit,
    setDataToEdit,
    openForm,
    setOpenForm,
  } = useContext(CrudContext);
  const [addMultiple, setAddMultiple] = useState(false);

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
      idCliente: null,
      apellidos: '',
      nombres: '',
      email: '',
      telefono: '',
      nacimiento: '',
      direccion: '',
      nacionalidad: '',
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

  /* dataToEdit = true => Edit client */

  useEffect(() => {
    if (dataToEdit) {
      setValue('idCliente', dataToEdit.idCliente);
      setValue('apellidos', dataToEdit.apellidos, { shouldValidate: true });
      setValue('nombres', dataToEdit.nombres, { shouldValidate: true });
      setValue('email', dataToEdit.email, { shouldValidate: true });
      setValue('telefono', dataToEdit.telefono, { shouldValidate: true });
      setValue('direccion', dataToEdit.direccion, { shouldValidate: true });
      setValue('nacimiento', dataToEdit.nacimiento, { shouldValidate: true });
      setValue('nacionalidad', dataToEdit.nacionalidad, {
        shouldValidate: true,
      });
    }
  }, [dataToEdit, setValue]);

  /* Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them */

  const onSubmit = data => {
    if (getValues().idCliente === null) {
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
    setValue('idCliente', null);
    resetField('apellidos', { keepErrors: false });
    resetField('nombres', { keepErrors: false });
    resetField('email', { keepErrors: false });
    resetField('telefono', { keepErrors: false });
    resetField('direccion', { keepErrors: false });
    resetField('nacimiento', { keepErrors: false });
    resetField('nacionalidad', { keepErrors: false });
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
          className='crud-form__dialog-title'
          variant='overline'
          display='block'
          color='text.primary'
        >
          {dataToEdit ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>

        <DialogContent dividers>
          <form
            className='crud-form__container'
            onSubmit={handleSubmit(onSubmit)}
            id='crud-form'
          >
            <Box>
              <InputLabel
                htmlFor='apellidos'
                error={errors.apellidos ? true : false}
              >
                Apellidos:
              </InputLabel>
              <TextField
                {...register('apellidos', {
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
                name='apellidos'
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.apellidos ? true : false}
                helperText={errors.apellidos ? errors.apellidos.message : ' '}
              />
            </Box>

            <Box>
              <InputLabel
                htmlFor='nombres'
                error={errors.nombres ? true : false}
              >
                Nombres:
              </InputLabel>
              <TextField
                {...register('nombres', {
                  required: messages.required,
                  pattern: {
                    value: patterns.onlyAlphabetic,
                    message: messages.onlyAlphabetic,
                  },
                })}
                variant='standard'
                type='text'
                fullWidth
                name='nombres'
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.nombres ? true : false}
                helperText={errors.nombres ? errors.nombres.message : ' '}
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
              <InputLabel
                htmlFor='telefono'
                error={errors.telefono ? true : false}
              >
                Teléfono:
              </InputLabel>
              <TextField
                {...register('telefono', {
                  required: messages.required,
                })}
                variant='standard'
                type='text'
                fullWidth
                name='telefono'
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.telefono ? true : false}
                helperText={errors.telefono ? errors.telefono.message : ' '}
              />
            </Box>

            <Box>
              <InputLabel
                htmlFor='direccion'
                error={errors.direccion ? true : false}
              >
                Dirección:
              </InputLabel>
              <TextField
                {...register('direccion', {
                  required: messages.required,
                })}
                variant='standard'
                type='text'
                fullWidth
                name='direccion'
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.direccion ? true : false}
                helperText={errors.direccion ? errors.direccion.message : ' '}
              />
            </Box>

            <Box>
              <InputLabel
                htmlFor='date'
                error={errors.nacimiento ? true : false}
              >
                Fecha de nacimiento:
              </InputLabel>
              <TextField
                {...register('nacimiento', {
                  required: messages.required,
                })}
                type='date'
                variant='standard'
                fullWidth
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.nacimiento ? true : false}
                helperText={errors.nacimiento ? errors.nacimiento.message : ' '}
              />
            </Box>

            <Box>
              <InputLabel
                htmlFor='nacionalidad'
                error={errors.nacionalidad ? true : false}
              >
                Nacionalidad
              </InputLabel>
              <TextField
                {...register('nacionalidad', {
                  required: messages.required,
                  pattern: {
                    value: patterns.onlyAlphabetic,
                    message: messages.onlyAlphabetic,
                  },
                })}
                variant='standard'
                type='text'
                fullWidth
                name='nacionalidad'
                size='small'
                color='info'
                autoComplete='off'
                InputLabelProps={{ shrink: true }}
                error={errors.nacionalidad ? true : false}
                helperText={
                  errors.nacionalidad ? errors.nacionalidad.message : ' '
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
