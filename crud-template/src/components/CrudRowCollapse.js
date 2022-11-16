import React, { useContext } from 'react';
import moment from 'moment';
import StyleContext from '../context/StyleContext';
import { Box, Collapse, Typography } from '@mui/material';

const CrudRowCollapse = ({ open, data }) => {
  const { mediaQ1024, mediaQ768, mediaQ560 } = useContext(StyleContext);

  const formattedDate = moment(data.date).format('D/MM/YYYY');

  return (
    <Collapse
      in={open}
      timeout='auto'
      unmountOnExit
      className='mytable-collapse'
    >
      <Box className='mytable-collapse__container'>
        <Box className='mytable-collapse__item'>
          <Box className='mytable-collapse__title'>Nacimiento</Box>
          <Box className='mytable-collapse__data'>{formattedDate}</Box>
        </Box>
        <Box className='mytable-collapse__item'>
          <Box className='mytable-collapse__title'>Dirección</Box>
          <Box className='mytable-collapse__data'>{data.address}</Box>
        </Box>
        <Box className='mytable-collapse__item'>
          <Box className='mytable-collapse__title'>Nacionalidad</Box>
          <Box className='mytable-collapse__data'>{data.nacionality}</Box>
        </Box>
        {!mediaQ1024 && (
          <Box className='mytable-collapse__item'>
            <Box className='mytable-collapse__title'>Correo Electrónico</Box>
            <Box className='mytable-collapse__data'>{data.email}</Box>
          </Box>
        )}
        {!mediaQ768 && (
          <Box className='mytable-collapse__item'>
            <Box className='mytable-collapse__title'>Teléfono</Box>
            <Box className='mytable-collapse__data'>{data.phone}</Box>
          </Box>
        )}
        {!mediaQ560 && (
          <Box className='mytable-collapse__item'>
            <Box className='mytable-collapse__title'>Estado</Box>
            <Box className='mytable-collapse__data'>
              <Typography
                sx={{
                  color: data.active ? 'success.light' : 'error.light',
                  fontWeight: 'bold',
                  lineHeight: '1',
                }}
              >
                {data.active ? 'Dado de alta' : 'Dado de baja'}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Collapse>
  );
};

export default CrudRowCollapse;
