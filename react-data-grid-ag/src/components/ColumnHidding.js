import React, { useContext, useEffect, useState } from 'react';
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
import StyleContext from '../context/StyleContext';

const ColumnHidding = ({
  visibleColumns,
  handleColumnHide,
  handleResetColumns,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { mediaQ1024, mediaQ768, mediaQ560 } = useContext(StyleContext);

  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(!render);
  }, [mediaQ1024, mediaQ560, mediaQ768]);

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
              <FormGroup>
                <FormControlLabel
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
              sx={{ width: '100%' }}
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
