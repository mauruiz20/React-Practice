import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CrudContext from '../context/CrudContext';
import moment from 'moment';

import { Box, Collapse, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import StyleContext from '../context/StyleContext';

// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";

const CrudTableRow = ({ data, setModal }) => {
  const [open, setOpen] = useState(false);
  const { setModalData, setDataToEdit, updateData } = useContext(CrudContext);
  const { mediaQ1024, mediaQ768, mediaQ560 } = useContext(StyleContext);

  const formattedDate = moment(data.date).format('D/MM/YYYY');

  /* Active / Inactive clients */

  const handleActive = (e, value) => {
    e.stopPropagation();
    data.active = value;
    updateData(data);
  };

  /* Open modal to confirm delete */

  const handleDelete = e => {
    e.stopPropagation();
    setModalData(data);
    setModal(true);
  };

  /* useNavigate hook returns a function that lets navigate programmatically */

  const navigate = useNavigate();

  /* Navigate to crear-modificar page */

  const handleEdit = e => {
    e.stopPropagation();
    setDataToEdit(data);
    navigate('/crear-modificar');
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
      id={data.id}
      className='mytable__body-row'
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
      <Box className='mytable__body-cell' sx={cellStyle}>
        {data.surname}
      </Box>
      <Box className='mytable__body-cell' sx={cellStyle}>
        {data.name}
      </Box>
      {mediaQ1024 && (
        <Box className='mytable__body-cell' sx={cellStyle}>
          {data.email}
        </Box>
      )}
      {mediaQ768 && (
        <Box className='mytable__body-cell' sx={cellStyle}>
          {data.phone}
        </Box>
      )}
      {mediaQ560 && (
        <Box className='mytable__body-cell--center' sx={cellStyle}>
          <Typography
            sx={{
              color: data.active ? 'success.light' : 'error.light',
              fontWeight: 'bold',
            }}
          >
            {data.active ? 'A' : 'B'}
          </Typography>
        </Box>
      )}
      <Box className='mytable__body-cell--center mytable__actions'>
        {/* <Tooltip
          title='Expandir'
          arrow
          placement='top'
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
          size='small'
        >
          <IconButton color='primary' onClick={() => setOpen(!open)}>
            {open ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Tooltip> */}

        <Tooltip
          title='Editar'
          arrow
          placement='top'
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
          size='small'
        >
          <IconButton
            sx={{ color: 'secondary.main' }}
            onClick={e => handleEdit(e)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={!data.active ? 'Dar de Alta' : 'Dar de Baja'}
          arrow
          placement='top'
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
          size='small'
        >
          <IconButton
            sx={{ color: !data.active ? 'success.light' : 'error.light' }}
            onClick={e => handleActive(e, !data.active)}
          >
            <ArrowUpwardIcon
              fontSize='small'
              sx={{
                transform: data.active ? 'rotate(180deg)' : 'rotate(0deg)',
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
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Collapse
        in={open}
        timeout='auto'
        unmountOnExit
        className='mytable-collapse'
      >
        <Box className='mytable-collapse__container'>
          <Box className='mytable-collapse__item'>
            <Box className='mytable-collapse__title'>Nacimiento</Box>
            <Box className='mytable-collapse__data'>{formattedDate}</Box>
          </Box>
          <Box className='mytable-collapse__item'>
            <Box className='mytable-collapse__title'>Dirección</Box>
            <Box className='mytable-collapse__data'>{data.address}</Box>
          </Box>
          <Box className='mytable-collapse__item'>
            <Box className='mytable-collapse__title'>Nacionalidad</Box>
            <Box className='mytable-collapse__data'>{data.nacionality}</Box>
          </Box>
          {!mediaQ1024 && (
            <Box className='mytable-collapse__item'>
              <Box className='mytable-collapse__title'>Correo Electrónico</Box>
              <Box className='mytable-collapse__data'>{data.email}</Box>
            </Box>
          )}
          {!mediaQ768 && (
            <Box className='mytable-collapse__item'>
              <Box className='mytable-collapse__title'>Teléfono</Box>
              <Box className='mytable-collapse__data'>{data.phone}</Box>
            </Box>
          )}
          {!mediaQ560 && (
            <Box className='mytable-collapse__item'>
              <Box className='mytable-collapse__title'>Estado</Box>
              <Box className='mytable-collapse__data'>
                <Typography
                  sx={{
                    color: data.active ? 'success.light' : 'error.light',
                    fontWeight: 'bold',
                    lineHeight: '1',
                  }}
                >
                  {data.active ? 'Dado de alta' : 'Dado de baja'}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default CrudTableRow;
