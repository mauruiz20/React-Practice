import React, { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';

import { Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudTableRow from './CrudTableRow';
import StyleContext from '../context/StyleContext';
import DialogDelete from './DialogDelete';

const CrudTable = ({ search }) => {
  const { db, rows, inactives, page, visibleColumns } = useContext(CrudContext);
  const { mediaQ560 } = useContext(StyleContext);
  const [order, setOrder] = useState('surname asc');
  const [modal, setModal] = useState(false);

  /* Client side rendering (prototype) */

  let str = search.search;

  const data = () => {
    let array = {};

    switch (order) {
      case 'surname asc':
        array = db.sort((a, b) =>
          a.surname.toLowerCase() < b.surname.toLowerCase() ? -1 : 1
        );
        break;

      case 'surname desc':
        array = db.sort((a, b) =>
          a.surname.toLowerCase() > b.surname.toLowerCase() ? -1 : 1
        );
        break;

      case 'name asc':
        array = db.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        );
        break;

      case 'name desc':
        array = db.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
        );
        break;

      default:
        break;
    }

    if (!inactives) {
      array = array.filter(data => data.state === 'A');
    }

    if (str !== '') {
      str = search.search.toString().toLowerCase();
      array = array.filter(
        data =>
          data.name.toLowerCase().includes(str) ||
          data.surname.toLowerCase().includes(str) ||
          data.email.toLowerCase().includes(str) ||
          data.phone.toString().includes(str)
      );
    }

    return array.map(
      (data, index) =>
        index < rows * page &&
        index >= (page - 1) * rows && (
          <CrudTableRow key={data.id} data={data} setModal={setModal} />
        )
    );
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
          {visibleColumns[0].visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              <IconButton
                size='small'
                sx={{
                  width: '100%',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  let alt = window.pageYOffset;
                  order === 'surname asc'
                    ? setOrder('surname desc')
                    : setOrder('surname asc');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
                disableRipple={true}
              >
                Apellidos
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    fontSize='small'
                    sx={{
                      color: order.includes('surname')
                        ? 'tertiary.main'
                        : 'transparent',
                      margin: '0 .5rem',
                      transform:
                        order === 'surname desc'
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

          {visibleColumns[1].visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              <IconButton
                size='small'
                sx={{
                  width: '100%',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                }}
                onClick={() => {
                  let alt = window.pageYOffset;
                  order === 'name asc'
                    ? setOrder('name desc')
                    : setOrder('name asc');
                  setTimeout(() => {
                    window.scrollTo({
                      top: alt,
                      behavior: 'auto',
                    });
                  }, 100);
                }}
                disableRipple={true}
              >
                Nombres
                {mediaQ560 && (
                  <ArrowUpwardIcon
                    fontSize='small'
                    sx={{
                      color: order.startsWith('name')
                        ? 'tertiary.main'
                        : 'transparent',
                      margin: '0 .5rem',
                      transform:
                        order === 'name desc'
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

          {visibleColumns[2].visible && (
            <Box className='mytable__head-cell mytable__email' sx={cellStyle}>
              Correo Electrónico
            </Box>
          )}

          {visibleColumns[3].visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Teléfono
            </Box>
          )}

          {visibleColumns[5].visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Fecha de Nacimiento
            </Box>
          )}

          {visibleColumns[6].visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Dirección
            </Box>
          )}

          {visibleColumns[7].visible && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Nacionalidad
            </Box>
          )}

          {visibleColumns[4].visible && (
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
