import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import StyleContext from '../context/StyleContext';

const StateNameColumn = ({ data }) => {
  const { mediaQ768 } = useContext(StyleContext);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {!mediaQ768 && (
        <Box
          sx={{
            minWidth: '10px',
            height: '10px',
            marginRight: '5px',
            borderRadius: '50%',
          }}
          bgcolor={data.state === 'A' ? 'success.main' : 'error.main'}
        ></Box>
      )}
      <Typography
        sx={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
          fontSize: '14px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {data.surname}
      </Typography>
    </Box>
  );
};

export default StateNameColumn;
