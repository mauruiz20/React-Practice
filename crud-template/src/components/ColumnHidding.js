import React, { useContext, useState } from 'react';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import {
  Button,
  Checkbox,
  Fab,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import CrudContext from '../context/CrudContext';
import StyleContext from '../context/StyleContext';

const ColumnHidding = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { visibleColumns, handleColumnHide, handleResetColumns } =
    useContext(CrudContext);

  const { mediaQ1024, mediaQ768, mediaQ560 } = useContext(StyleContext);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fab
        color='primary'
        size='small'
        aria-label='view-columns'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ margin: '0 .5rem' }}
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
        sx={{ width: '50%' }}
      >
        <Typography variant='h6' sx={{ textAlign: 'center' }}>
          Columnas visibles
        </Typography>
        <MenuList dense>
          {visibleColumns.map(column => (
            <MenuItem key={column.field}>
              <FormGroup sx={{ width: '100%' }}>
                <FormControlLabel
                  sx={{ height: '30px' }}
                  control={
                    <Checkbox
                      type='checkbox'
                      // disabled={
                      //   (column.field === 'email' && !mediaQ1024) ||
                      //   (column.field === 'phone' && !mediaQ768) ||
                      //   (column.field === 'state' && !mediaQ560)
                      // }
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
              sx={{ width: '100%', marginTop: '.5rem' }}
              onClick={handleResetColumns}
            >
              Reiniciar
            </Button>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default ColumnHidding;
