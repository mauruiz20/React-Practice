import React, {useState} from 'react';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import {useCrud} from '../context/CrudContext';

const ColumnHidding = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const {visibleColumns, handleColumnHide, handleResetColumns} = useCrud();

    const handleClick = evt => {
        setAnchorEl(evt.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Fab
                color='primary'
                size='small'
                aria-label='view-columns'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{margin: '0 .5rem'}}
            >
                <ViewColumnIcon />
            </Fab>

            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{width: '50%'}}
            >
                <Typography variant='h6' sx={{textAlign: 'center'}}>
                    Columnas visibles
                </Typography>
                <MenuList dense>
                    {visibleColumns.map(column => (
                        <MenuItem key={column.field}>
                            <FormGroup sx={{width: '100%'}}>
                                <FormControlLabel
                                    sx={{height: '30px'}}
                                    control={
                                        <Checkbox
                                            type='checkbox'
                                            checked={column.visible}
                                            onChange={evt =>
                                                handleColumnHide(evt.target.checked, column)
                                            }
                                            size='small'
                                        />
                                    }
                                    label={column.Header}
                                />
                            </FormGroup>
                        </MenuItem>
                    ))}
                    <MenuItem>
                        <Button
                            variant='contained'
                            size='small'
                            sx={{width: '100%', marginTop: '.5rem'}}
                            onClick={handleResetColumns}
                        >
                            Reiniciar
                        </Button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default ColumnHidding;
