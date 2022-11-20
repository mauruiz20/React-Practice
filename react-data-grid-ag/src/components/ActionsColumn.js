import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';
import StyleContext from '../context/StyleContext';

const ActionsColumn = ({ data, setOpenForm, setOpenModal, gridRef }) => {
  const { setDataToEdit, setDataToDelete, updateData } =
    useContext(CrudContext);

  const { mediaQ560 } = useContext(StyleContext);

  const handleEdit = () => {
    setDataToEdit(data);
    setOpenForm(true);
  };

  const handleDelete = () => {
    setDataToDelete(data);
    setOpenModal(true);
  };

  const handleState = () => {
    data.state = data.state === 'A' ? 'B' : 'A';
    updateData(data);
    gridRef.current.api.refreshCells({ force: true });
    // setReload(!reload);
  };

  /* Responsive Design */

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [reload, setReload] = useState(false);

  return (
    <Box className='mytable__body-cell'>
      {mediaQ560 && (
        <>
          <Tooltip
            title='Editar'
            arrow
            placement='top'
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <IconButton
              sx={{ color: 'primary.main' }}
              onClick={e => handleEdit(e)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={data.state === 'A' ? 'Dar de baja' : 'Dara de alta'}
            arrow
            placement='top'
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <IconButton
              sx={{
                color: data.state === 'A' ? 'error.light' : 'success.light',
              }}
              onClick={e => handleState(e)}
            >
              <ArrowUpwardIcon
                fontSize='small'
                sx={{
                  transform:
                    data.state === 'A' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease-out',
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip
            title='Borrar'
            arrow
            placement='top'
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
            onClick={e => handleDelete(e)}
          >
            <IconButton>
              <DeleteIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </>
      )}

      {/* Responsive Design */}

      {!mediaQ560 && (
        <>
          <IconButton
            aria-label='more'
            id='long-button'
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='long-menu'
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={e => handleEdit(e)}>
              <Tooltip
                title='Editar'
                arrow
                placement='top'
                disableInteractive
                enterDelay={2000}
                enterNextDelay={2000}
                leaveDelay={10}
              >
                <EditIcon fontSize='small' sx={{ color: 'primary.main' }} />
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={e => handleState(e)}>
              <Tooltip
                title={data.state === 'A' ? 'Dar de baja' : 'Dara de alta'}
                arrow
                placement='top'
                disableInteractive
                enterDelay={2000}
                enterNextDelay={2000}
                leaveDelay={10}
              >
                <ArrowUpwardIcon
                  fontSize='small'
                  sx={{
                    color: data.state === 'A' ? 'error.light' : 'success.light',
                    transform:
                      data.state === 'A' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s ease-out',
                  }}
                />
              </Tooltip>
            </MenuItem>
            <MenuItem onClick={e => handleDelete(e)}>
              <Tooltip
                title='Borrar'
                arrow
                placement='top'
                disableInteractive
                enterDelay={2000}
                enterNextDelay={2000}
                leaveDelay={10}
              >
                <DeleteIcon fontSize='small' color='neutral' />
              </Tooltip>
            </MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default ActionsColumn;
