import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useCrud } from '../context/CrudContext';
import { dialogCloseSubject$ } from './CustomDialog/CustomDialog';

const DialogDelete = ({ children }) => {
    const { state, deleteData } = useCrud();
    const { modalData: data } = state;

    /* Close dialog */
    const handleClose = () => (dialogCloseSubject$.setSubject = true);

    /* Confirm delete */
    const handleDelete = () => {
        handleClose();
        deleteData(data.idUsuario);
    };

    return (
        <>
            <DialogTitle className='dialog-delete__title' variant='overline' color='text.primary'>
                Confirmación de borrado
            </DialogTitle>

            <DialogContent className='dialog-delete__content' dividers>
                <Typography>{children}</Typography>
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
        </>
    );
};

export default DialogDelete;
