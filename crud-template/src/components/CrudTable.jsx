import React from 'react';
import {useCrud} from '../context/CrudContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CrudTableRow from './CrudTableRow';
import DialogDelete from './DialogDelete';
import HeaderCell from './HeaderCell';

const CrudTable = () => {
    const {state, visibleColumns, handleSetOrden, handleSetOpenDelete} = useCrud();
    const {db, openDelete, orden} = state;

    // Renderizado de las filas (TableRow)
    const renderRows = () => {
        if (db?.length > 0) {
            return db.map(data => <CrudTableRow key={data.idUsuario} data={data} />);
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
            <DialogDelete open={openDelete} setOpen={handleSetOpenDelete} />

            <Box className='mytable__head'>
                <Box className='mytable__head-row'>
                    {visibleColumns.map(
                        column =>
                            column.visible && (
                                <HeaderCell
                                    key={column.field}
                                    column={column}
                                    orden={orden}
                                    setOrden={handleSetOrden}
                                />
                            ),
                    )}
                </Box>
            </Box>

            {/* Renderizado de las filas (TableRow) */}
            <Box className='mytable__body'>{renderRows()}</Box>
        </Box>
    );
};

export default CrudTable;
