import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ThemeSwitch from './ThemeSwitch';

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            CRUD Ag grid
          </Typography>
          <ThemeSwitch />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
