import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import '../../mytable.css';

/*
 * Componente MyColumnManager (Visibilidad de columnas)
 * Botón | Panel de selección
 */
const MyColumnManager = ({ visibleColumns, handleColumnHide, handleResetColumns }) => {
    /* Ancla al botón */
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    /* Handler para abrir el panel y situarlo debajo del Botón*/
    const handleClick = (evt) => {
        setAnchorEl(evt.currentTarget);
    };

    /* Handler para cerrar el panel */
    const handleClose = () => {
        setAnchorEl(null);
    };

    /* Handler para detectar el click fuera del checkbox y llamarlo */
    const handleCheckboxChange = (evt, column) => {
        evt.preventDefault();
        if (list.length > 1 || !column.visible) handleColumnHide(!column.visible, column);
    };

    const [list, setList] = useState([]);

    useEffect(() => {
        const newList = visibleColumns.filter((column) => column.visible);
        setList(newList);
    }, [visibleColumns]);

    return (
        <Box>
            {/* Botón para abrir o cerrar el panel */}
            <Button
                variant='contained'
                color='primary'
                aria-label='view-columns'
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ minWidth: '36px', padding: '6px 0', borderRadius: 2 }}
            >
                <ViewColumnIcon />
            </Button>

            {/* Panel de selección */}
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {/* Título */}
                <Typography variant='h6' sx={{ textAlign: 'center' }}>
                    Columnas
                </Typography>

                <MenuList dense>
                    {visibleColumns.map((column) => (
                        <MenuItem
                            key={column.field}
                            onClick={(evt) => handleCheckboxChange(evt, column)}
                        >
                            <FormGroup className='column-hidding__item'>
                                <FormControlLabel
                                    className='column-hidding__checkbox'
                                    control={
                                        <Checkbox
                                            type='checkbox'
                                            checked={column.visible}
                                            onChange={(evt) =>
                                                handleColumnHide(evt.target.checked, column)
                                            }
                                            size='small'
                                            disabled={list.length === 1 && column.visible}
                                        />
                                    }
                                    label={column.label}
                                />
                            </FormGroup>
                        </MenuItem>
                    ))}

                    {/* Botón para reiniciar la visibilidad de las columnas */}
                    <MenuItem>
                        <Button
                            className='column-hidding__reset-btn'
                            variant='contained'
                            size='small'
                            onClick={handleResetColumns}
                        >
                            Reiniciar
                        </Button>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default MyColumnManager;
