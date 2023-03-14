import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import React from 'react';
import { CrudProvider, useCrud } from '../context/CrudContext';
import useColumn from '../hooks/useColumn';
import ActionButton from './ActionButton';
import CrudForm from './CrudForm';
import CrudFormSearch from './CrudFormSearch';
import CustomDialog, { dialogOpenSubject$ } from './CustomDialog/CustomDialog';
import DialogDelete from './DialogDelete';
import { MyTable } from './MyTable';

const Crud = () => {
    return (
        <CrudProvider>
            <CrudPage />
        </CrudProvider>
    );
};

const CrudPage = () => {
    const {
        state,
        loading,
        handleSetOrden,
        handleSetRowCount,
        handleSetPage,
        handleStateData,
        handleSetModalData,
        handleSetDataToEdit,
        handleSetOpenForm,
    } = useCrud();
    const { db, numRows, orden, rowCount, page } = state;

    /* Llamada al manejador para dar de alta o baja el usuario */
    const handleState = (evt, data) => {
        evt.stopPropagation();
        handleStateData(data);
    };

    /* Ventana modal para confirmar el borrado */
    const handleDelete = (evt, data) => {
        evt.stopPropagation();
        handleSetModalData(data);
        dialogOpenSubject$.setSubject = true;
    };

    /* Ventana modal para editar el usuario */
    const handleEdit = (evt, data) => {
        evt.stopPropagation();
        handleSetDataToEdit(data);
        handleSetOpenForm(true);
    };

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
            flex: 2,
            order: 'A',
            visible: true,
            renderCell: (row) => row.apellidos,
        },
        {
            field: 'nombres',
            label: 'Nombres',
            flex: 2,
            order: 'N',
            visible: true,
            renderCell: (row) => row.nombres,
        },
        {
            field: 'correo',
            label: 'Correo',
            flex: 2,
            order: 'C',
            visible: true,
            renderCell: (row) => row.correo,
        },
        {
            field: 'nacimiento',
            label: 'Nacimiento',
            flex: 2,
            order: 'F',
            visible: false,
            renderCell: (row) => formatedDate(row.nacimiento),
        },
        {
            field: 'estadoUsuario',
            label: 'Estado',
            minWidth: '65px',
            visible: true,
            renderCell: (row) => (
                <Chip
                    color={row.estadoUsuario === 'A' ? 'success' : 'error'}
                    size='small'
                    label={row.estadoUsuario === 'A' ? 'Alta' : 'Baja'}
                    clickable={true}
                    variant='outlined'
                />
            ),
        },
        {
            field: 'acciones',
            label: 'Acciones',
            visible: true,
            minWidth: '120px',
            align: 'center',
            flex: 1,
            renderCell: (row) => (
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 0',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <ActionButton
                        title='Editar'
                        Icon={EditIcon}
                        onClick={(evt) => handleEdit(evt, row)}
                        color={'primary.main'}
                    />

                    <ActionButton
                        title={row.estadoUsuario === 'B' ? 'Dar de Alta' : 'Dar de Baja'}
                        Icon={ArrowUpwardIcon}
                        onClick={(evt) => handleState(evt, row)}
                        color={row.estadoUsuario === 'B' ? 'success.light' : 'error.light'}
                        stylesIcon={{
                            transform:
                                row.estadoUsuario === 'A' ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease-out',
                        }}
                    />

                    <ActionButton
                        title='Borrar'
                        Icon={DeleteIcon}
                        onClick={(evt) => handleDelete(evt, row)}
                    />
                </Box>
            ),
        },
    ];

    const { visibleColumns, handleColumnHide, handleResetColumns } = useColumn(columns);

    const forms = [
        { field: 'idUsuario', initialValue: null, noForm: true },
        {
            field: 'apellidos',
            initialValue: '',
            label: 'Apellidos',
            autoFocus: true,
            pattern: 'onlyAlphabetic',
        },
        {
            field: 'nombres',
            initialValue: '',
            label: 'Nombres',
            pattern: 'onlyAlphabetic',
        },
        {
            field: 'correo',
            initialValue: '',
            label: 'Correo electrónico',
            pattern: 'email',
            type: 'email',
        },
        {
            field: 'nacimiento',
            initialValue: '',
            label: 'Fecha de nacimiento',
            type: 'date',
        },
    ];

    return (
        <>
            <CustomDialog>
                <DialogDelete>¿Está seguro que desea eliminar el usuario?</DialogDelete>
            </CustomDialog>

            <CrudForm forms={forms} />

            <Paper sx={{ position: 'relative' }}>
                <CrudFormSearch
                    visibleColumns={visibleColumns}
                    handleColumnHide={handleColumnHide}
                    handleResetColumns={handleResetColumns}
                />

                {loading && (
                    <CircularProgress
                        sx={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '2rem',
                        }}
                    />
                )}

                <MyTable
                    rows={db}
                    columns={visibleColumns}
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
        </>
    );
};

export default Crud;
