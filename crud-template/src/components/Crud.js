import React, { useContext, useState } from 'react';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import CrudPagination from './CrudPagination';
import CrudFormSearch from './CrudFormSearch';
import { Route, Routes } from 'react-router-dom';
import CrudContext from '../context/CrudContext';
import { CircularProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';

const Crud = () => {
  const { db, loading } = useContext(CrudContext);
  const [search, setSearch] = useState({ search: '' });

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Box sx={{ margin: '2rem' }}>
              <Paper
                elevation={6}
                sx={{
                  width: '100%',
                  borderRadius: '1rem',
                  position: 'relative',
                }}
              >
                <CrudFormSearch setSearch={setSearch} />
                {loading && (
                  <CircularProgress
                    sx={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                    }}
                  />
                )}

                {db && <CrudTable search={search} />}
                {db && <CrudPagination />}
              </Paper>
            </Box>
          }
        />
        <Route
          path='/crear-modificar'
          element={
            <Box sx={{ margin: '2rem' }}>
              <Paper elevation={6} sx={{ width: '100%', borderRadius: '1rem' }}>
                <CrudForm />
              </Paper>
            </Box>
          }
        />
      </Routes>
    </>
  );
};

export default Crud;
