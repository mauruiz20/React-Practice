import React, { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';

import { Box, IconButton, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudTableRow from './CrudTableRow';
import StyleContext from '../context/StyleContext';
import DialogDelete from './DialogDelete';

const CrudTable = () => {
  const { db, orden, setOrden, numRows, visibleColumns } =
    useContext(CrudContext);
  const { mediaQ560 } = useContext(StyleContext);
  const [modal, setModal] = useState(false);

  // Renderizado de las filas (TableRow)
  const data = () => {
    if (numRows > 0) {
      return db.map(data => (
        <CrudTableRow key={data.idUsuario} data={data} setModal={setModal} />
      ));
    } else {
      return (
        <Typography className='mytable__empty' variant='overline'>
          Sin entradas
        </Typography>
      );
    }
  };

  // Estilos para los bordes de las celdas
  const cellStyle = {
    borderRight: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'table.border',
  };

  return (
    <Box className='mytable'>
      {/* Ventana modal para borrar una fila */}
      <DialogDelete open={modal} setOpen={setModal} />

      <Box className='mytable__head'>
        {/* Renderizado de la cabecera de la tabla */}
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
                className='mytable__head-btn'
                size='small'
                disableRipple={true}
                onClick={() => {
                  let alt = window.pageYOffset;
                  orden === 'A' ? setOrden('AD') : setOrden('A');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
              >
                Apellidos
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    className='mytable__head-btn-arrow'
                    fontSize='small'
                    sx={{
                      color: orden.includes('A')
                        ? 'secondary.main'
                        : 'transparent',
                      transform:
                        orden === 'AD' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </IconButton>
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'nombres').visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              <IconButton
                className='mytable__head-btn'
                size='small'
                disableRipple={true}
                onClick={() => {
                  let alt = window.pageYOffset;
                  orden === 'N' ? setOrden('ND') : setOrden('N');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
              >
                Nombres
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    className='mytable__head-btn-arrow'
                    fontSize='small'
                    sx={{
                      color: orden.includes('N')
                        ? 'secondary.main'
                        : 'transparent',
                      transform:
                        orden === 'ND' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </IconButton>
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'email').visible && (
            <Box className='mytable__head-cell mytable__email' sx={cellStyle}>
              <IconButton
                className='mytable__head-btn'
                size='small'
                disableRipple={true}
                onClick={() => {
                  let alt = window.pageYOffset;
                  orden === 'E' ? setOrden('ED') : setOrden('E');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
              >
                Correo Electrónico
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    className='mytable__head-btn-arrow'
                    fontSize='small'
                    sx={{
                      color: orden.includes('E')
                        ? 'secondary.main'
                        : 'transparent',
                      transform:
                        orden === 'ED' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  />
                )}
              </IconButton>
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

          {visibleColumns.find(col => col.field === 'estadoUsuario')
            .visible && (
            <Box className='mytable__head-cell mytable__state' sx={cellStyle}>
              Estado
            </Box>
          )}

          {visibleColumns.find(col => col.field === 'rol').visible && (
            <Box className='mytable__head-cell mytable__rol' sx={cellStyle}>
              Rol
            </Box>
          )}

          <Box className='mytable__head-cell mytable__actions'>Acciones</Box>
        </Box>
      </Box>

      {/* Renderizado de las filas (TableRow) */}
      <Box className='mytable__body'>{data()}</Box>
    </Box>
  );
};

export default CrudTable;
