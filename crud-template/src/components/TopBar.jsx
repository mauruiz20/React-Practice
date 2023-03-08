import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {useStyle} from '../context/StyleContext';

const TopBar = () => {
    const {darkMode, setDarkMode} = useStyle();

    const handleDarkMode = () => {
        if (darkMode) {
            setDarkMode(false);
            localStorage.setItem('theme', 'light');
        } else {
            setDarkMode(true);
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position='static' sx={{backgroundColor: 'primary.main'}}>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
                        CRUD Template
                    </Typography>
                    <IconButton sx={{}} onClick={handleDarkMode}>
                        {!darkMode ? (
                            <NightlightRoundIcon sx={{color: '#fff'}} />
                        ) : (
                            <WbSunnyIcon sx={{color: '#fff'}} />
                        )}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;
