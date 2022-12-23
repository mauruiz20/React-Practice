import React, { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';

import { Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudTableRow from './CrudTableRow';
import StyleContext from '../context/StyleContext';
import DialogDelete from './DialogDelete';

const CrudTable = () => {
  const { db, visibleColumns } = useContext(CrudContext);
  const { mediaQ560 } = useContext(StyleContext);
  const [order, setOrder] = useState('apellidos asc');
  const [modal, setModal] = useState(false);

  /* Client side rendering (prototype) */

  const data = () => {
    let array = {};

    switch (order) {
      case 'apellidos asc':
        array = db.sort((a, b) =>
          a.apellidos.toLowerCase() < b.apellidos.toLowerCase() ? -1 : 1
        );
        break;

      case 'apellidos desc':
        array = db.sort((a, b) =>
          a.apellidos.toLowerCase() > b.apellidos.toLowerCase() ? -1 : 1
        );
        break;

      case 'nombres asc':
        array = db.sort((a, b) =>
          a.nombres.toLowerCase() < b.nombres.toLowerCase() ? -1 : 1
        );
        break;

      case 'nombres desc':
        array = db.sort((a, b) =>
          a.nombres.toLowerCase() > b.nombres.toLowerCase() ? -1 : 1
        );
        break;

      default:
        break;
    }

    return array.map(data => (
      <CrudTableRow key={data.idCliente} data={data} setModal={setModal} />
    ));
  };

  const cellStyle = {
    borderRight: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'table.border',
  };

  return (
    <Box className='mytable'>
      <DialogDelete open={modal} setOpen={setModal} />

      <Box className='mytable__head'>
        <Box
          className='mytable__head-row'
          sx={{
            bgcolor: 'background.paper',
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))',
          }}
        >
          {visibleColumns.find(col => col.field === 'apellidos').visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              <IconButton
                className='mytable__btn'
                size='small'
                onClick={() => {
                  let alt = window.pageYOffset;
                  order === 'apellidos asc'
                    ? setOrder('apellidos desc')
                    : setOrder('apellidos asc');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
                disableRipple={true}
                sx={{ color: 'inherit' }}
              >
                Apellidos
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    fontSize='small'
                    sx={{
                      color: order.includes('apellidos')
                        ? 'tertiary.main'
                        : 'transparent',
                      margin: '0 .5rem',
                      transform:
                        order === 'apellidos desc'
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      transition: 'transform 0.25s ease-out, color 0.25s',
                      '&:hover': {
                        color: 'tertiary.main',
                      },
                    }}
                  />
                )}
              </IconButton>
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'nombres').visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              <IconButton
                className='mytable__btn'
                size='small'
                onClick={() => {
                  let alt = window.pageYOffset;
                  order === 'nombres asc'
                    ? setOrder('nombres desc')
                    : setOrder('nombres asc');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
                disableRipple={true}
                sx={{ color: 'inherit' }}
              >
                Nombres
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    fontSize='small'
                    sx={{
                      color: order.startsWith('nombres')
                        ? 'tertiary.main'
                        : 'transparent',
                      margin: '0 .5rem',
                      transform:
                        order === 'nombres desc'
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      transition: 'transform 0.25s ease-out, color 0.25s',
                      '&:hover': {
                        color: 'tertiary.main',
                      },
                    }}
                  />
                )}
              </IconButton>
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'email').visible && (
            <Box className='mytable__head-cell mytable__email' sx={cellStyle}>
              Correo Electrónico
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'telefono').visible && (
            <Box className='mytable__head-cell mytable__phone' sx={cellStyle}>
              Teléfono
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'nacimiento').visible && (
            <Box className='mytable__head-cell mytable__date' sx={cellStyle}>
              Fecha de Nacimiento
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'direccion').visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Dirección
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'nacionalidad').visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Nacionalidad
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'estadoCliente')
            .visible && (
            <Box className='mytable__head-cell mytable__state' sx={cellStyle}>
              Estado
            </Box>
          )}

          <Box className='mytable__head-cell mytable__actions'>Acciones</Box>
        </Box>
      </Box>
      <Box className='mytable__body'>{data()}</Box>
    </Box>
  );
};

export default CrudTable;
