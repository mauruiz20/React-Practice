import React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import {useCrud} from '../context/CrudContext';

const CrudRowCollapse = ({open, data}) => {
    const {visibleColumns} = useCrud();

    const formattedDate = moment(data.nacimiento).format('D/MM/YYYY');

    return (
        <Collapse in={open} timeout='auto' unmountOnExit className='mytable-collapse'>
            <Box className='mytable-collapse__container'>
                {!visibleColumns.find(col => col.field === 'apellidos').visible && (
                    <Box className='mytable-collapse__item'>
                        <Box className='mytable-collapse__title'>Apellidos</Box>
                        <Box className='mytable-collapse__data'>{data.apellidos}</Box>
                    </Box>
                )}

                {!visibleColumns.find(col => col.field === 'nombres').visible && (
                    <Box className='mytable-collapse__item'>
                        <Box className='mytable-collapse__title'>Nombres</Box>
                        <Box className='mytable-collapse__data'>{data.nombres}</Box>
                    </Box>
                )}

                {!visibleColumns.find(col => col.field === 'correo').visible && (
                    <Box className='mytable-collapse__item'>
                        <Box className='mytable-collapse__title'>Correo Electrónico</Box>
                        <Box className='mytable-collapse__data'>{data.correo}</Box>
                    </Box>
                )}

                {!visibleColumns.find(col => col.field === 'nacimiento').visible && (
                    <Box className='mytable-collapse__item'>
                        <Box className='mytable-collapse__title'>Nacimiento</Box>
                        <Box className='mytable-collapse__data'>{formattedDate}</Box>
                    </Box>
                )}

                {!visibleColumns.find(col => col.field === 'estadoUsuario').visible && (
                    <Box className='mytable-collapse__item'>
                        <Box className='mytable-collapse__title'>Estado</Box>
                        <Box className='mytable-collapse__data'>
                            <Typography
                                sx={{
                                    color:
                                        data.estadoUsuario === 'A'
                                            ? 'success.light'
                                            : 'error.light',
                                    fontWeight: 'bold',
                                    lineHeight: '1',
                                }}
                            >
                                {data.estadoUsuario === 'A' ? 'Dado de alta' : 'Dado de baja'}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Collapse>
    );
};

export default CrudRowCollapse;
