import React, { useContext, useState } from 'react';
import CrudTable from './CrudTable';
import CrudPagination from './CrudPagination';
import CrudFormSearch from './CrudFormSearch';
import CrudContext from '../context/CrudContext';
import { CircularProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';

const Crud = () => {
  const { db, loading } = useContext(CrudContext);
  const [search, setSearch] = useState({ search: '' });

  return (
    <>
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
    </>
  );
};

export default Crud;
