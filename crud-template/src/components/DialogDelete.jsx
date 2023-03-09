import React from 'react';
import {useCrud} from '../context/CrudContext';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const DialogDelete = ({open, setOpen}) => {
    const {state, deleteData} = useCrud();
    const {modalData: data} = state;

    /* Close dialog */

    const handleClose = () => setOpen(false);

    /* Confirm delete */

    const handleDelete = () => {
        setOpen(false);
        deleteData(data.idUsuario);
    };

    return (
        <>
            <Dialog onClose={handleClose} open={open} maxWidth={'sm'} fullWidth={true}>
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
                        <b>{`${data.apellidos}, ${data.nombres}`}</b>?
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
