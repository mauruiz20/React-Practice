import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useCrud } from '../context/CrudContext';
import { MyColumnManager } from './MyTable';

const CrudFormSearch = ({ visibleColumns, handleColumnHide, handleResetColumns }) => {
    const { state, handleSetCadena, handleSetIncluyeBajas, handleSetOpenForm } = useCrud();
    const { incluyeBajas } = state;

    const { register, handleSubmit } = useForm({});

    const onSubmit = (data) => {
        handleSetCadena(data.cadena);
    };

    return (
        <div className='crud-form-search'>
            <Typography className='crud-form-search__title' variant='overline' display='block'>
                Gestión usuarios
            </Typography>

            <hr className='crud-form-search__hr' />

            <form className='crud-form-search__form' onSubmit={handleSubmit(onSubmit)}>
                <Box className='crud-form-search__container'>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        sx={{
                            minWidth: '36px',
                            padding: '6px 0',
                            borderRadius: '1rem 0 0 1rem',
                            height: '40px',
                        }}
                    >
                        <SearchIcon />
                    </Button>

                    <TextField
                        className='crud-form-search__input'
                        label='Búsqueda'
                        variant='outlined'
                        type='search'
                        size='small'
                        autoComplete='off'
                        {...register('cadena')}
                        InputProps={{ sx: { borderRadius: '0 1rem 1rem 0' } }}
                    />

                    <FormControlLabel
                        className='crud-form-search__checkbox'
                        control={
                            <Checkbox
                                checked={incluyeBajas}
                                sx={{
                                    margin: '0 0 0 1rem',
                                }}
                                onChange={handleSetIncluyeBajas}
                            />
                        }
                        label='Incluir bajas'
                    />

                    <MyColumnManager
                        visibleColumns={visibleColumns}
                        handleColumnHide={handleColumnHide}
                        handleResetColumns={handleResetColumns}
                    />
                </Box>

                <Box className='crud-form-search__actions'>
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ borderRadius: 4 }}
                        onClick={() => handleSetOpenForm(true)}
                    >
                        Agregar
                        <AddCircleIcon sx={{ ml: 1 }} />
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default CrudFormSearch;
