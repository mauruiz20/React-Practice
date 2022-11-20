import { Box, Chip } from '@mui/material';
import React from 'react';

const StateColumn = props => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Chip
        label={props.data.state}
        color={props.data.state === 'A' ? 'success' : 'error'}
        size='small'
        sx={{ minWidth: '25px' }}
      />
    </Box>
  );
};

export default StateColumn;
