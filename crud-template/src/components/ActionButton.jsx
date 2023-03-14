import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

const ActionButton = ({ title, Icon, onClick, color, stylesIcon, loading }) => {
    return (
        <Tooltip
            title={title}
            arrow
            placement='top'
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
        >
            <IconButton
                className='mytable__actions-btn'
                sx={{ color: color }}
                onClick={onClick}
                size='small'
            >
                <Icon fontSize='small' sx={stylesIcon} />
                {loading && (
                    <CircularProgress size={30} color={'warning'} sx={{ position: 'absolute' }} />
                )}
            </IconButton>
        </Tooltip>
    );
};

export default ActionButton;
