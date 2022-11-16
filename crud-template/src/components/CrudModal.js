import React, { useContext } from 'react';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Box, Button } from '@mui/material';
import CrudContext from '../context/CrudContext';

const CrudModal = ({ open, setOpen }) => {
  const { modalData: data, deleteData } = useContext(CrudContext);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    setOpen(false);
    deleteData(data.id);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          className='crud-modal'
          sx={{ backgroundColor: 'background.paper' }}
        >
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='h2'
            textAlign='center'
            color='text.primary'
          >
            Confirmación de borrado
          </Typography>
          <hr className='crud-modal__hr' />
          <Typography
            id='modal-modal-description'
            sx={{ textAlign: 'center' }}
            color='text.primary'
          >
            ¿Estás seguro que quieres borrar al usuario{' '}
            <b>
              {data.surname} {data.name}
            </b>
            ?
          </Typography>
          <hr className='crud-modal__hr' />
          <Box className='crud-modal__btn-container'>
            <Button
              className='crud-modal__btn'
              variant='contained'
              color='neutral'
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              className='crud-modal__btn'
              variant='contained'
              color='warning'
              onClick={handleDelete}
            >
              Confirmar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CrudModal;
