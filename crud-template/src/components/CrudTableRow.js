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
    handleStateData,
    visibleColumns,
    setOpenForm,
  } = useContext(CrudContext);

  /* Llamada al manejador para dar de alta o baja el cliente */
  const handleState = evt => {
    evt.stopPropagation();
    handleStateData(data);
  };

  /* Ventana modal para confirmar el borrado */
  const handleDelete = evt => {
    evt.stopPropagation();
    setModalData(data);
    setModal(true);
  };

  /* Ventana modal para editar el cliente */
  const handleEdit = evt => {
    evt.stopPropagation();
    setDataToEdit(data);
    setOpenForm(true);
  };

  /* Manejador de la fila collapse */
  const handleAccordion = () => {
    setOpen(!open);
  };

  // Estilos para los bordes de las celdas
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
      <Box id={data.idCliente} className='mytable__body-row'>
        {visibleColumns.find(col => col.field === 'apellidos').visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.apellidos}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'nombres').visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.nombres}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'email').visible && (
          <Box className='mytable__body-cell mytable__email' sx={cellStyle}>
            {data.email}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'telefono').visible && (
          <Box className='mytable__body-cell mytable__phone' sx={cellStyle}>
            {data.telefono}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'nacimiento').visible && (
          <Box className='mytable__body-cell mytable__date' sx={cellStyle}>
            {moment(data.nacimiento).format('D/MM/YYYY')}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'direccion').visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.direccion}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'nacionalidad').visible && (
          <Box className='mytable__body-cell' sx={cellStyle}>
            {data.nacionalidad}
          </Box>
        )}

        {visibleColumns.find(col => col.field === 'estadoCliente').visible && (
          <Box
            className='mytable__body-cell--center mytable__state'
            sx={cellStyle}
          >
            <Chip
              label={data.estadoCliente === 'A' ? 'A' : 'B'}
              color={data.estadoCliente === 'A' ? 'success' : 'error'}
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
              onClick={evt => handleEdit(evt)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={data.estadoCliente === 'B' ? 'Dar de Alta' : 'Dar de Baja'}
            arrow
            placement='top'
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <IconButton
              sx={{
                color:
                  data.estadoCliente === 'B' ? 'success.light' : 'error.light',
              }}
              onClick={evt => handleState(evt, data.estadoCliente)}
            >
              <ArrowUpwardIcon
                fontSize='small'
                sx={{
                  transform:
                    data.estadoCliente === 'A'
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
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
