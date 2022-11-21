import React, { useContext } from 'react';
import CrudContext from '../context/CrudContext';
import Typography from '@mui/material/Typography';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const DialogDelete = ({ open, setOpen }) => {
  const { modalData: data, deleteData } = useContext(CrudContext);

  /* Close dialog */

  const handleClose = () => setOpen(false);

  /* Confirm delete */

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
          className='dialog-delete__title'
          variant='overline'
          color='text.primary'
        >
          Confirmación de borrado
        </DialogTitle>

        <DialogContent className='dialog-delete__content' dividers>
          <Typography>
            ¿Estás seguro que quieres borrar al usuario{' '}
            <b>{`${data.surname}, ${data.name}`}</b>?
          </Typography>
        </DialogContent>

        <DialogActions className='dialog-delete__actions'>
          <Button
            className='dialog-delete__btn'
            variant='contained'
            color='neutral'
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            className='dialog-delete__btn'
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

export default DialogDelete;
