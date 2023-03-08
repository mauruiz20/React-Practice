import React from 'react';
import CrudTable from './CrudTable';
import CrudPagination from './CrudPagination';
import CrudFormSearch from './CrudFormSearch';
import {CrudProvider, useCrud} from '../context/CrudContext';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';

const Crud = () => {
    return (
        <CrudProvider>
            <CrudPage />
        </CrudProvider>
    );
};

const CrudPage = () => {
    const {db, numRows, loading} = useCrud();

    return (
        <Paper>
            <CrudFormSearch />
            {loading && (
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                    }}
                />
            )}
            {db && <CrudTable />}
            {db && numRows > 0 && <CrudPagination />}
        </Paper>
    );
};

export default Crud;
