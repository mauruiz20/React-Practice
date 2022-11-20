import { Chip } from '@mui/material';
import React from 'react';

const StateColumn = props => {
  return (
    <div>
      <Chip
        label={props.data.state}
        color={props.data.state === 'A' ? 'success' : 'error'}
        size='small'
        sx={{ minWidth: '25px' }}
      />
    </div>
  );
};

export default StateColumn;
