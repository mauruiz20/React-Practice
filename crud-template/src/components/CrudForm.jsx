import React, {useEffect, useState} from 'react';
import {useCrud} from '../context/CrudContext';
import {useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import {messages, patterns} from '../utils/constants';

const CrudForm = () => {
    const {createData, updateData, dataToEdit, setDataToEdit, openForm, setOpenForm} = useCrud();
    const [addMultiple, setAddMultiple] = useState(false);

    /* useForm is a custom hook for managing forms with ease */

    const {
        register,
        handleSubmit,
        formState: {errors},
        resetField,
        setValue,
        getValues,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            idUsuario: null,
            apellidos: '',
            nombres: '',
            correo: '',
            nacimiento: '',
        },
    });

    /* dataToEdit = true => Edit client */

    useEffect(() => {
        if (dataToEdit) {
            setValue('idUsuario', dataToEdit.idUsuario);
            setValue('apellidos', dataToEdit.apellidos, {shouldValidate: true});
            setValue('nombres', dataToEdit.nombres, {shouldValidate: true});
            setValue('correo', dataToEdit.correo, {shouldValidate: true});
            setValue('nacimiento', dataToEdit.nacimiento, {shouldValidate: true});
        }
    }, [dataToEdit, setValue]);

    /* Validation will trigger on the submit event and invalid inputs will attach onChange event listeners to re-validate them */

    const onSubmit = data => {
        if (getValues().idUsuario === null) {
            // ID == null => create data
            createData(data);
            handleReset();
            setOpenForm(addMultiple);
        } else {
            // ID != null => update data
            updateData(data);
        }
    };

    /* Reset form */

    const handleReset = () => {
        setValue('idUsuario', null);
        resetField('apellidos', {keepError: false});
        resetField('nombres', {keepError: false});
        resetField('correo', {keepError: false});
        resetField('nacimiento', {keepError: false});
        setDataToEdit(null);
    };

    /* Close form */

    const handleClose = () => {
        setOpenForm(false);
        handleReset();
        setAddMultiple(false);
    };

    return (
        <>
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
                        <Box>
                            <InputLabel htmlFor='apellidos' error={errors.apellidos ? true : false}>
                                Apellidos:
                            </InputLabel>
                            <TextField
                                {...register('apellidos', {
                                    required: messages.required,
                                    pattern: {
                                        value: patterns.onlyAlphabetic,
                                        message: messages.onlyAlphabetic,
                                    },
                                })}
                                variant='standard'
                                type='text'
                                autoFocus
                                fullWidth
                                name='apellidos'
                                size='small'
                                color='info'
                                autoComplete='off'
                                InputLabelProps={{shrink: true}}
                                error={errors.apellidos ? true : false}
                                helperText={errors.apellidos ? errors.apellidos.message : ' '}
                            />
                        </Box>

                        <Box>
                            <InputLabel htmlFor='nombres' error={errors.nombres ? true : false}>
                                Nombres:
                            </InputLabel>
                            <TextField
                                {...register('nombres', {
                                    required: messages.required,
                                    pattern: {
                                        value: patterns.onlyAlphabetic,
                                        message: messages.onlyAlphabetic,
                                    },
                                })}
                                variant='standard'
                                type='text'
                                fullWidth
                                name='nombres'
                                size='small'
                                color='info'
                                autoComplete='off'
                                InputLabelProps={{shrink: true}}
                                error={errors.nombres ? true : false}
                                helperText={errors.nombres ? errors.nombres.message : ' '}
                            />
                        </Box>

                        <Box>
                            <InputLabel htmlFor='correo' error={errors.correo ? true : false}>
                                Correo electrónico:
                            </InputLabel>
                            <TextField
                                {...register('correo', {
                                    required: messages.required,
                                    pattern: {
                                        value: patterns.email,
                                        message: messages.email,
                                    },
                                })}
                                variant='standard'
                                type='email'
                                fullWidth
                                name='correo'
                                size='small'
                                color='info'
                                autoComplete='off'
                                InputLabelProps={{shrink: true}}
                                error={errors.correo ? true : false}
                                helperText={errors.correo ? errors.correo.message : ' '}
                            />
                        </Box>

                        <Box>
                            <InputLabel htmlFor='date' error={errors.nacimiento ? true : false}>
                                Fecha de nacimiento:
                            </InputLabel>
                            <TextField
                                {...register('nacimiento', {
                                    required: messages.required,
                                })}
                                type='date'
                                variant='standard'
                                fullWidth
                                size='small'
                                color='info'
                                autoComplete='off'
                                InputLabelProps={{shrink: true}}
                                error={errors.nacimiento ? true : false}
                                helperText={errors.nacimiento ? errors.nacimiento.message : ' '}
                            />
                        </Box>
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
                                    onChange={evt => setAddMultiple(evt.target.checked)}
                                    value='addMultiple'
                                    inputProps={{'aria-label': 'secondary checkbox'}}
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
        </>
    );
};

export default CrudForm;
