import React, { useContext } from 'react';
import CrudContext from '../context/CrudContext';
import { useForm } from 'react-hook-form';
import CrudForm from './CrudForm';
import ColumnHidding from './ColumnHidding';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Checkbox,
  Fab,
  FormControlLabel,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

const CrudFormSearch = () => {
  const { setCadena, incluyeBajas, setIncluyeBajas, setPage, setOpenForm } =
    useContext(CrudContext);

  const { register, handleSubmit } = useForm({});

  const onSubmit = data => {
    setCadena(data.cadena);
  };

  /* Handle Actives / Inactives */

  const handleInactives = () => {
    setIncluyeBajas(!incluyeBajas);
    setPage(1);
  };

  return (
    <div className='crud-form-search'>
      <Typography
        className='crud-form-search__title'
        variant='overline'
        display='block'
      >
        Gestión clientes
      </Typography>

      <hr className='crud-form-search__hr' />

      <form
        className='crud-form-search__form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className='crud-form-search__container'>
          <TextField
            className='crud-form-search__input'
            label='Búsqueda'
            variant='outlined'
            type='cadena'
            size='small'
            autoComplete='off'
            {...register('cadena')}
          />

          <FormControlLabel
            className='crud-form-search__checkbox'
            control={
              <Checkbox
                checked={incluyeBajas}
                sx={{
                  margin: '0 0 0 1rem',
                }}
                onChange={handleInactives}
              />
            }
            label='Incluir bajas'
          />

          <ColumnHidding />
        </Box>

        <Box className='crud-form-search__actions'>
          <Tooltip
            title='Buscar'
            arrow
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
            type='submit'
          >
            <Fab className='crud-form-search__btn' color='primary'>
              <SearchIcon sx={{ fontSize: '35px' }} />
            </Fab>
          </Tooltip>
          <Fab
            variant='extended'
            size='medium'
            color='primary'
            onClick={() => setOpenForm(true)}
          >
            Agregar cliente
            <AddCircleIcon sx={{ ml: 1 }} />
          </Fab>
        </Box>
      </form>

      <CrudForm />
    </div>
  );
};

export default CrudFormSearch;
