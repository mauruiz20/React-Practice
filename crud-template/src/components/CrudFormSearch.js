import React, { useCallback, useContext } from 'react';
import CrudContext from '../context/CrudContext';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
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
        <div className='crud-form-search__container'>
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
            sx={{ userSelect: 'none' }}
          />

          <ColumnHidding />

          <Tooltip
            title='Buscar'
            arrow
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
            type='submit'
            sx={{ margin: '0 .5rem' }}
          >
            <Fab color='primary'>
              <SearchIcon sx={{ fontSize: '35px' }} />
            </Fab>
          </Tooltip>
        </div>

        <Fab
          variant='extended'
          size='medium'
          color='primary'
          onClick={() => setOpenForm(true)}
        >
          Agregar cliente
          <AddCircleIcon sx={{ ml: 1 }} />
        </Fab>
      </form>

      <CrudForm />
    </div>
  );
};

export default CrudFormSearch;
