import React, { useContext, useState } from 'react';
import CrudForm from './CrudForm';
import CrudTable from './CrudTable';
import CrudPagination from './CrudPagination';
import CrudFormSearch from './CrudFormSearch';
import { Route, Routes } from 'react-router-dom';
import CrudContext from '../context/CrudContext';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress, Paper } from '@mui/material';
import { darkTheme, lightTheme } from './Themes';
import BasicAppBar from './BasicAppBar';
import { Box } from '@mui/system';

const Crud = () => {
  const { db, loading } = useContext(CrudContext);
  const [darkMode, setDarkMode] = useState(false);

  if (darkMode) {
    document.querySelector('body').classList.remove('light-theme');
    document.querySelector('body').classList.add('dark-theme');
  } else {
    document.querySelector('body').classList.add('light-theme');
    document.querySelector('body').classList.remove('dark-theme');
  }

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BasicAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
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
                  <CrudFormSearch />
                  {loading && (
                    <CircularProgress
                      sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
                    />
                  )}

                  {db && <CrudTable />}
                  {db && <CrudPagination />}
                </Paper>
              </Box>
            }
          />
          <Route
            path='/crear-modificar'
            element={
              <Box sx={{ margin: '2rem' }}>
                <Paper
                  elevation={6}
                  sx={{ width: '100%', borderRadius: '1rem' }}
                >
                  <CrudForm />
                </Paper>
              </Box>
            }
          />
        </Routes>
      </ThemeProvider>
    </>
  );
};

export default Crud;
