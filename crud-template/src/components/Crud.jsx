import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import React from 'react';
import { CrudProvider, useCrud } from '../context/CrudContext';
import CrudFormSearch from './CrudFormSearch';
import CrudPagination from './CrudPagination';
import CrudTable from './CrudTable';
import { MyTable } from './MyTable';

const Crud = () => {
    return (
        <CrudProvider>
            <CrudPage />
        </CrudProvider>
    );
};

const CrudPage = () => {
    const { state, loading, handleSetOrden, handleSetRowCount, handleSetPage } = useCrud();
    const { db, numRows, orden, rowCount, page } = state;

    const formatedDate = (date) => {
        const fecha = new Date(date);

        const dia = (fecha.getDate() + 1).toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear().toString();

        return `${dia}/${mes}/${anio}`;
    };

    const columns = [
        {
            field: 'apellidos',
            label: 'Apellidos',
            flex: 1,
            order: 'A',
            visible: true,
            renderCell: (row) => row.apellidos,
        },
        {
            field: 'nombres',
            label: 'Nombres',
            flex: 1,
            order: 'N',
            visible: true,
            renderCell: (row) => row.nombres,
        },
        {
            field: 'correo',
            label: 'Correo',
            flex: 1,
            order: 'C',
            visible: true,
            renderCell: (row) => row.correo,
        },
        {
            field: 'nacimiento',
            label: 'Nacimiento',
            flex: 1,
            order: 'F',
            visible: false,
            renderCell: (row) => formatedDate(row.nacimiento),
        },
        {
            field: 'estadoUsuario',
            label: 'Estado',
            minWidth: '65px',
            order: 'E',
            visible: true,
            renderCell: (row) => (
                <>
                    <Chip
                        color={row.estadoUsuario === 'A' ? 'success' : 'error'}
                        size='small'
                        label={row.estadoUsuario}
                        clickable={true}
                    />
                </>
            ),
        },
    ];

    return (
        <Paper sx={{ position: 'relative' }}>
            <CrudFormSearch />
            {loading && (
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '2rem',
                    }}
                />
            )}
            {db && <CrudTable />}
            {db && numRows > 0 && <CrudPagination />}

            <MyTable
                rows={db}
                columns={columns}
                rowId={(row) => row.idUsuario}
                orderState={{ order: orden, setOrder: handleSetOrden }}
                pagination={{
                    numRows,
                    rowCount,
                    setRowCount: handleSetRowCount,
                    page,
                    setPage: handleSetPage,
                }}
            />
        </Paper>
    );
};

export default Crud;
