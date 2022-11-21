import { useContext, useState } from 'react';
import CrudContext from '../context/CrudContext';
import moment from 'moment';

import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CrudRowCollapse from './CrudRowCollapse';

const CrudTableRow = ({ data, setModal }) => {
  const [open, setOpen] = useState(false);
  const {
    setModalData,
    setDataToEdit,
    updateData,
    visibleColumns,
    setOpenForm,
  } = useContext(CrudContext);

  /* Active / Inactive clients */

  const handleActive = evt => {
    evt.stopPropagation();
    data.state = data.state === 'A' ? 'B' : 'A';
    updateData(data);
  };

  /* Open modal to confirm delete */

  const handleDelete = e => {
    e.stopPropagation();
    setModalData(data);
    setModal(true);
  };

  const handleEdit = e => {
    e.stopPropagation();
    setDataToEdit(data);
    setOpenForm(true);
  };

  const handleAccordion = () => {
    setOpen(!open);
  };

  const cellStyle = {
    borderRight: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'table.border',
  };

  return (
    <Box
      onClick={handleAccordion}
      sx={[
        {
          backgroundColor: 'table.rowOdd',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
          borderBottomColor: 'table.border',
          '&:nth-of-type(even)': {
            backgroundColor: 'table.rowEven',
          },
          '&:hover': {
            backgroundColor: 'table.rowHover',
          },
        },
      ]}
    >
      <Box id={data.id} className='mytable__body-row'>
        {visibleColumns[0].visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.surname}
          </Box>
        )}

        {visibleColumns[1].visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.name}
          </Box>
        )}

        {visibleColumns[2].visible && (
          <Box className='mytable__body-cell mytable__email' sx={cellStyle}>
            {data.email}
          </Box>
        )}

        {visibleColumns[3].visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.phone}
          </Box>
        )}

        {visibleColumns[5].visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {moment(data.date).format('D/MM/YYYY')}
          </Box>
        )}

        {visibleColumns[6].visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.address}
          </Box>
        )}

        {visibleColumns[7].visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.nacionality}
          </Box>
        )}

        {visibleColumns[4].visible && (
          <Box
            className='mytable__body-cell--center mytable__state'
            sx={cellStyle}
          >
            <Chip
              label={data.state === 'A' ? 'A' : 'B'}
              color={data.state === 'A' ? 'success' : 'error'}
              size='small'
              sx={{ minWidth: '30px', cursor: 'pointer' }}
            />
          </Box>
        )}

        <Box className='mytable__body-cell--center mytable__actions'>
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
            title={data.state === 'B' ? 'Dar de Alta' : 'Dar de Baja'}
            arrow
            placement='top'
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <IconButton
              sx={{
                color: data.state === 'B' ? 'success.light' : 'error.light',
              }}
              onClick={e => handleActive(e, data.state)}
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
        </Box>
      </Box>
      <CrudRowCollapse open={open} data={data} />
    </Box>
  );
};

export default CrudTableRow;
