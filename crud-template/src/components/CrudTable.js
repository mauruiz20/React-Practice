import React, { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';
import CrudModal from './CrudModal';

import { Box, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudTableRow from './CrudTableRow';

const CrudTable = () => {
  const {
    db,
    rows,
    inactives,
    page,
    search,
    mediaQ1024,
    mediaQ768,
    mediaQ560,
  } = useContext(CrudContext);
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

  return (
    <Box className='mytable'>
      <CrudModal open={modal} setOpen={setModal} />

      <Box className='mytable__head'>
        <Box
          className='mytable__head-row'
          sx={{
            bgcolor: 'background.paper',
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11));',
          }}
        >
          <Box className='mytable__head-cell'>
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
              {order === 'surname desc' ? (
                <ArrowDownwardIcon fontSize='small' />
              ) : (
                <ArrowUpwardIcon fontSize='small' />
              )}
            </IconButton>
          </Box>
          <Box className='mytable__head-cell'>
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
              {order === 'name desc' ? (
                <ArrowDownwardIcon fontSize='small' />
              ) : (
                <ArrowUpwardIcon fontSize='small' />
              )}
            </IconButton>
          </Box>
          {mediaQ1024 && (
            <Box className='mytable__head-cell'>Correo Electrónico</Box>
          )}
          {mediaQ768 && <Box className='mytable__head-cell'>Teléfono</Box>}
          {mediaQ560 && (
            <Box className='mytable__head-cell mytable__state'>Estado</Box>
          )}
          <Box className='mytable__head-cell'>Acciones</Box>
        </Box>
      </Box>
      <Box className='mytable__body'>{data()}</Box>
    </Box>
  );
};

export default CrudTable;
