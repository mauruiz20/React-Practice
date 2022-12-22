import React, { useContext } from 'react';
import CrudTable from './CrudTable';
import CrudPagination from './CrudPagination';
import CrudFormSearch from './CrudFormSearch';
import CrudContext from '../context/CrudContext';
import { CircularProgress, Paper } from '@mui/material';

const Crud = () => {
  const { db, loading } = useContext(CrudContext);

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
      {db && <CrudPagination />}
    </Paper>
  );
};

export default Crud;
