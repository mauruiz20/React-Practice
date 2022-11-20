import React, { useContext } from 'react';

import Typography from '@mui/material/Typography';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CrudContext from '../context/CrudContext';

const CrudModal = ({ open, setOpen }) => {
  const { dataToDelete: data, deleteData } = useContext(CrudContext);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    setOpen(false);
    deleteData(data.id);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <DialogTitle
          variant='overline'
          color='text.primary'
          sx={{
            textAlign: 'center',
            fontSize: '1.2rem',
            lineHeight: '1.2rem',
            paddingTop: '1.5rem',
          }}
        >
          Confirmación de borrado
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ textAlign: 'center', padding: '2rem 0' }}>
            ¿Estás seguro que quieres borrar al usuario{' '}
            <b>{`${data.surname}, ${data.name}`}</b>?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'space-between', padding: '1.25rem' }}
        >
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CrudModal;
