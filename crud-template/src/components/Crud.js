import React from 'react';
import { Paper } from '@mui/material';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import CrudPagination from './CrudPagination';
import CrudFormSearch from './CrudFormSearch';
import { Route, Routes } from 'react-router-dom';

const Crud = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Paper elevation={6} sx={{ width: '100%', borderRadius: '1rem' }}>
              <CrudFormSearch />
              <CrudTable />
              <CrudPagination />
            </Paper>
          }
        />
        <Route
          path='/crear-modificar'
          element={
            <Paper
              elevation={6}
              sx={{
                width: '100%',
                borderRadius: '1rem',
              }}
            >
              <CrudForm />
            </Paper>
          }
        />
      </Routes>
    </>
  );
};

export default Crud;
