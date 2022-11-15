import React, { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';
import CrudModal from './CrudModal';

import { Box, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudTableRow from './CrudTableRow';
import StyleContext from '../context/StyleContext';

const CrudTable = ({ search }) => {
  const { db, rows, inactives, page } = useContext(CrudContext);
  const { mediaQ1024, mediaQ768, mediaQ560 } = useContext(StyleContext);
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
      array = array.filter(data => data.active === true);
    }

    if (str !== '') {
      str = search.search.toString().toLowerCase();
      array = array.filter(data => data.name.toLowerCase().includes(str));
    }

    return array.map(
      (data, index) =>
        index < rows * page &&
        index >= (page - 1) * rows && (
          <CrudTableRow key={data.id} data={data} setModal={setModal} />
        )
    );
  };

  const orderStyles = {
    position: 'absolute',
    transform: !mediaQ560 ? 'translate(2.75rem)' : 'translate(3.5rem)',
  };

  const cellStyle = {
    borderRight: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'table.border',
  };

  return (
    <Box className='mytable'>
      <CrudModal open={modal} setOpen={setModal} />

      <Box className='mytable__head'>
        <Box
          className='mytable__head-row'
          sx={{
            bgcolor: 'table.rowOdd',
          }}
        >
          <Box className='mytable__head-cell' sx={cellStyle}>
            Apellidos
            <IconButton
              size='small'
              sx={orderStyles}
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
              color={
                order === 'surname asc' || order === 'surname desc'
                  ? 'primary'
                  : 'default'
              }
              disableRipple={true}
            >
              <ArrowUpwardIcon
                fontSize='small'
                sx={{
                  transform:
                    order === 'surname desc'
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  transition: 'transform 0.25s ease-out',
                }}
              />
            </IconButton>
          </Box>
          <Box className='mytable__head-cell' sx={cellStyle}>
            Nombres
            <IconButton
              size='small'
              sx={orderStyles}
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
              color={
                order === 'name asc' || order === 'name desc'
                  ? 'primary'
                  : 'default'
              }
              disableRipple={true}
            >
              <ArrowUpwardIcon
                fontSize='small'
                sx={{
                  transform:
                    order === 'name desc' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease-out',
                }}
              />
            </IconButton>
          </Box>
          {mediaQ1024 && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Correo Electrónico
            </Box>
          )}
          {mediaQ768 && (
            <Box className='mytable__head-cell' sx={cellStyle}>
              Teléfono
            </Box>
          )}
          {mediaQ560 && (
            <Box className='mytable__head-cell mytable__state' sx={cellStyle}>
              Estado
            </Box>
          )}
          <Box className='mytable__head-cell'>Acciones</Box>
        </Box>
      </Box>
      <Box className='mytable__body'>{data()}</Box>
    </Box>
  );
};

export default CrudTable;
