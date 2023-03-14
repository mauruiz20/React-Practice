import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCrud } from '../context/CrudContext';
import FormInput from './FormInput/FormInput';

const CrudForm = ({ forms }) => {
    const { state, createData, updateData, handleSetDataToEdit, handleSetOpenForm } = useCrud();
    const { dataToEdit, openForm } = state;
    const [addMultiple, setAddMultiple] = useState(false);

    let initialValues = {};

    forms.forEach((el) => {
        initialValues[el.field] = el.initialValue;
    });

    /* useForm is a custom hook for managing forms with ease */
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            initialValues,
        },
    });

    /* dataToEdit = true => update */
    useEffect(() => {
        if (dataToEdit) {
            forms.forEach((el) => {
                setValue(el.field, dataToEdit[el.field]);
            });
        }
    }, [dataToEdit, setValue, forms]);

    /* Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them */
    const onSubmit = (data) => {
        if (data.idUsuario === null) {
            // ID == null => create data
            createData(data);
            handleReset();
            handleSetOpenForm(addMultiple);
        } else {
            // ID != null => update data
            updateData(data);
        }
    };

    /* Reset form */
    const handleReset = () => {
        forms.forEach((el) => {
            setValue(el.field, el.initialValue);
        });
        handleSetDataToEdit(null);
    };

    /* Close form */
    const handleClose = () => {
        handleReset();
        setAddMultiple(false);
        handleSetOpenForm(false);
    };

    const renderForms = () => {
        return forms.map(
            (el) =>
                !el.noForm && (
                    <FormInput
                        key={el.field}
                        field={el.field}
                        label={el.label}
                        register={register}
                        errors={errors}
                        type={el.type}
                        pattern={el.pattern}
                        autoFocus={el.autoFocus}
                    />
                ),
        );
    };

    return (
        <Dialog
            open={openForm}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle
                id='form-dialog-title'
                className='crud-form__dialog-title'
                variant='overline'
                display='block'
                color='text.primary'
            >
                {dataToEdit ? 'Editar Usuario' : 'Agregar Usuario'}
            </DialogTitle>

            <DialogContent dividers>
                <form
                    className='crud-form__container'
                    onSubmit={handleSubmit(onSubmit)}
                    id='crud-form'
                >
                    {renderForms()}
                </form>
            </DialogContent>

            <DialogActions className='crud-form__dialog-actions'>
                <Button
                    className='crud-form__btn'
                    onClick={handleClose}
                    variant='contained'
                    color='neutral'
                >
                    Cancelar
                </Button>

                <Box>
                    {!dataToEdit && (
                        <Tooltip title='Agregar múltiples usuarios' placement='left'>
                            <Switch
                                checked={addMultiple}
                                onChange={(evt) => setAddMultiple(evt.target.checked)}
                                value='addMultiple'
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Tooltip>
                    )}

                    <Button
                        className='crud-form__btn'
                        type='submit'
                        form='crud-form'
                        variant='contained'
                        color='primary'
                    >
                        {dataToEdit ? 'Editar' : 'Agregar'}
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default CrudForm;
