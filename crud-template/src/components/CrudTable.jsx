import React, {useState} from 'react';
import {useCrud} from '../context/CrudContext';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudTableRow from './CrudTableRow';
import DialogDelete from './DialogDelete';
import {useStyle} from '../context/StyleContext';
import {cellStyle} from '../utils/constants';
import HeaderCell from './HeaderCell';

const CrudTable = () => {
    const {db, orden, setOrden, numRows, visibleColumns} = useCrud();
    const {mediaQ560} = useStyle();
    const [modal, setModal] = useState(false);

    // Renderizado de las filas (TableRow)
    const data = () => {
        if (db?.length > 0) {
            return db.map(data => (
                <CrudTableRow key={data.idUsuario} data={data} setModal={setModal} />
            ));
        } else {
            return (
                <Typography className='mytable__empty' variant='overline'>
                    Sin entradas
                </Typography>
            );
        }
    };

    return (
        <Box className='mytable'>
            {/* Ventana modal para borrar una fila */}
            <DialogDelete open={modal} setOpen={setModal} />

            <Box className='mytable__head'>
                {/* Renderizado de la cabecera de la tabla */}
                <Box className='mytable__head-row'>
                    {visibleColumns.map(
                        column =>
                            column.visible && (
                                <HeaderCell
                                    key={column.field}
                                    column={column}
                                    orden={orden}
                                    setOrden={setOrden}
                                />
                            ),
                    )}
                    {/* {visibleColumns.find(col => col.field === 'apellidos').visible && (
                        <Box className='mytable__head-cell' sx={cellStyle}>
                            <IconButton
                                className='mytable__head-btn'
                                size='small'
                                disableRipple={true}
                                onClick={() => {
                                    let alt = window.pageYOffset;
                                    orden === 'A' ? setOrden('AD') : setOrden('A');
                                    setTimeout(() => {
                                        window.scrollTo({
                                            top: alt,
                                            behavior: 'auto',
                                        });
                                    }, 100);
                                }}
                            >
                                Apellidos
                                {mediaQ560 && (
                                    <ArrowUpwardIcon
                                        className='mytable__head-btn-arrow'
                                        fontSize='small'
                                        sx={{
                                            color: orden.includes('A')
                                                ? 'secondary.main'
                                                : 'transparent',
                                            transform:
                                                orden === 'AD' ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Box>
                    )}

                    {visibleColumns.find(col => col.field === 'nombres').visible && (
                        <Box className='mytable__head-cell' sx={cellStyle}>
                            <IconButton
                                className='mytable__head-btn'
                                size='small'
                                disableRipple={true}
                                onClick={() => {
                                    let alt = window.pageYOffset;
                                    orden === 'N' ? setOrden('ND') : setOrden('N');
                                    setTimeout(() => {
                                        window.scrollTo({
                                            top: alt,
                                            behavior: 'auto',
                                        });
                                    }, 100);
                                }}
                            >
                                Nombres
                                {mediaQ560 && (
                                    <ArrowUpwardIcon
                                        className='mytable__head-btn-arrow'
                                        fontSize='small'
                                        sx={{
                                            color: orden.includes('N')
                                                ? 'secondary.main'
                                                : 'transparent',
                                            transform:
                                                orden === 'ND' ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Box>
                    )}

                    {visibleColumns.find(col => col.field === 'correo').visible && (
                        <Box className='mytable__head-cell mytable__email' sx={cellStyle}>
                            <IconButton
                                className='mytable__head-btn'
                                size='small'
                                disableRipple={true}
                                onClick={() => {
                                    let alt = window.pageYOffset;
                                    orden === 'C' ? setOrden('CD') : setOrden('C');
                                    setTimeout(() => {
                                        window.scrollTo({
                                            top: alt,
                                            behavior: 'auto',
                                        });
                                    }, 100);
                                }}
                            >
                                Correo Electrónico
                                {mediaQ560 && (
                                    <ArrowUpwardIcon
                                        className='mytable__head-btn-arrow'
                                        fontSize='small'
                                        sx={{
                                            color: orden.includes('C')
                                                ? 'secondary.main'
                                                : 'transparent',
                                            transform:
                                                orden === 'CD' ? 'rotate(180deg)' : 'rotate(0deg)',
                                        }}
                                    />
                                )}
                            </IconButton>
                        </Box>
                    )}

                    {visibleColumns.find(col => col.field === 'nacimiento').visible && (
                        <Box className='mytable__head-cell mytable__date' sx={cellStyle}>
                            Fecha de Nacimiento
                        </Box>
                    )}

                    {visibleColumns.find(col => col.field === 'estadoUsuario').visible && (
                        <Box className='mytable__head-cell mytable__state' sx={cellStyle}>
                            Estado
                        </Box>
                    )}

                    <Box className='mytable__head-cell mytable__actions'>Acciones</Box> */}
                </Box>
            </Box>

            {/* Renderizado de las filas (TableRow) */}
            <Box className='mytable__body'>{data()}</Box>
        </Box>
    );
};

export default CrudTable;
