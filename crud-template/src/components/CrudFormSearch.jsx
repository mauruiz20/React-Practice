import React from 'react';
import {useCrud} from '../context/CrudContext';
import {useForm} from 'react-hook-form';
import CrudForm from './CrudForm';
import ColumnHidding from './ColumnHidding';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const CrudFormSearch = () => {
    const {state, handleSetCadena, handleSetIncluyeBajas, handleSetOpenForm} = useCrud();
    const {incluyeBajas} = state;

    const {register, handleSubmit} = useForm({});

    const onSubmit = data => {
        handleSetCadena(data.cadena);
    };

    const handleInactives = () => {
        handleSetIncluyeBajas(!incluyeBajas);
    };

    return (
        <div className='crud-form-search'>
            <Typography className='crud-form-search__title' variant='overline' display='block'>
                Gestión usuarios
            </Typography>

            <hr className='crud-form-search__hr' />

            <form className='crud-form-search__form' onSubmit={handleSubmit(onSubmit)}>
                <Box className='crud-form-search__container'>
                    <TextField
                        className='crud-form-search__input'
                        label='Búsqueda'
                        variant='outlined'
                        type='search'
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
                            <SearchIcon sx={{fontSize: '35px'}} />
                        </Fab>
                    </Tooltip>

                    <Fab
                        variant='extended'
                        size='medium'
                        color='primary'
                        onClick={() => handleSetOpenForm(true)}
                    >
                        Agregar usuario
                        <AddCircleIcon sx={{ml: 1}} />
                    </Fab>
                </Box>
            </form>

            <CrudForm />
        </div>
    );
};

export default CrudFormSearch;
