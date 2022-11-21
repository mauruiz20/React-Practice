import React, { useCallback, useContext } from 'react';
import CrudContext from '../context/CrudContext';
import { useForm } from 'react-hook-form';
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
import ColumnHidding from './ColumnHidding';
import CrudForm from './CrudForm';

const CrudFormSearch = ({ setSearch }) => {
  const { inactives, setInactives, setPage, setOpenForm } =
    useContext(CrudContext);
  const { register, handleSubmit } = useForm({});

  const onSubmit = useCallback(
    data => {
      setSearch(data);
    },
    [setSearch]
  );

  const handleCheck = e => {
    setInactives(!inactives);
    setPage(1);
  };

  return (
    <div className='crud-form-search'>
      <Typography
        variant='overline'
        display='block'
        sx={{ fontSize: '2rem', textAlign: 'center', lineHeight: '4rem' }}
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
            type='search'
            size='small'
            autoComplete='off'
            {...register('search')}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={inactives}
                sx={{
                  margin: '0 0 0 1rem',
                }}
                onChange={handleCheck}
              />
            }
            label='Incluir bajas'
            sx={{ userSelect: 'none', minWidth: '150px' }}
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
            <Fab color='primary' sx={{ minWidth: '56px', margin: '0 1rem' }}>
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
