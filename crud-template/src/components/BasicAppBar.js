import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StyleContext from '../context/StyleContext';

export default function BasicAppBar() {
  const { darkMode, setDarkMode } = useContext(StyleContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            CRUD Template
          </Typography>
          <IconButton sx={{}} onClick={() => setDarkMode(!darkMode)}>
            {!darkMode ? (
              <NightlightRoundIcon sx={{ color: '#fff' }} />
            ) : (
              <WbSunnyIcon sx={{ color: '#fff' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
