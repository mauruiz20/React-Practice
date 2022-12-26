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
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  const [showPassword, setShowPassword] = useState(false);
  const [idRol, setIdRol] = useState(1);

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
      idUsuario: null,
      idRol: 1,
      apellidos: '',
      nombres: '',
      email: '',
      nacimiento: '',
      direccion: '',
      clave: '',
    },
  });

  /* Fields control */

  const messages = {
    required: 'Campo obligatorio',
    onlyAlphabetic: 'Solo se acepta letras y espacios en blanco',
    email: 'Correo incorrecto',
    passwordLength: 'Mínimo 6 caracteres',
  };

  const patterns = {
    onlyAlphabetic: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
    email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
  };

  /* dataToEdit = true => Edit client */

  useEffect(() => {
    if (dataToEdit) {
      setValue('idUsuario', dataToEdit.idUsuario);
      setValue('idRol', dataToEdit.rol.idRol);
      setIdRol(dataToEdit.rol.idRol);
      setValue('apellidos', dataToEdit.apellidos, { shouldValidate: true });
      setValue('nombres', dataToEdit.nombres, { shouldValidate: true });
      setValue('email', dataToEdit.email, { shouldValidate: true });
      setValue('direccion', dataToEdit.direccion, { shouldValidate: true });
      setValue('nacimiento', dataToEdit.nacimiento, { shouldValidate: true });
    }
  }, [dataToEdit, setValue]);

  /* Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them */

  const onSubmit = data => {
    if (getValues().idUsuario === null) {
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
    setValue('idUsuario', null);
    setIdRol(1);
    resetField('idRol', { keepErrors: false });
    resetField('apellidos', { keepErrors: false });
    resetField('nombres', { keepErrors: false });
    resetField('email', { keepErrors: false });
    resetField('direccion', { keepErrors: false });
    resetField('nacimiento', { keepErrors: false });
    resetField('clave', { keepErrors: false });
    setDataToEdit(null);
  };

  /* Close form */

  const handleClose = () => {
    setOpenForm(false);
    handleReset();
    setAddMultiple(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = evt => {
    evt.preventDefault();
  };

  const handleRol = evt => {
    setIdRol(evt.target.value);
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
          {dataToEdit ? 'Editar Usuario' : 'Agregar Usuario'}
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

            <FormControl
              variant='standard'
              sx={{ width: '30%', marginBottom: '20px' }}
            >
              <InputLabel id='select' sx={{ fontSize: '1.33rem', top: '-2px' }}>
                Rol:
              </InputLabel>
              <Select
                {...register('idRol', {
                  required: messages.required,
                })}
                name='idRol'
                labelId='select'
                id='select'
                value={idRol}
                label='idRol'
                onChange={handleRol}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Administrativo</MenuItem>
                <MenuItem value={3}>Cobrador</MenuItem>
                <MenuItem value={4}>Cliente</MenuItem>
              </Select>
            </FormControl>

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
              <InputLabel htmlFor='clave' error={errors.clave ? true : false}>
                Clave:
              </InputLabel>
              <TextField
                {...register('clave', {
                  required: messages.required,
                  minLength: {
                    value: 6,
                    message: messages.passwordLength,
                  },
                })}
                variant='standard'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                name='clave'
                size='small'
                color='info'
                autoComplete='off'
                error={errors.clave ? true : false}
                helperText={errors.clave ? errors.clave.message : ' '}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
              <Tooltip title='Agregar múltiples usuarios' placement='left'>
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
