import { Box, IconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Actions = ({ cell }) => {
  return (
    <Box className='mytable__actions'>
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
          sx={{ color: 'primary.main' }}
          onClick={() => console.log(cell.row.values)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={cell.row.values.status === 'B' ? 'Dar de Alta' : 'Dar de Baja'}
        arrow
        placement='top'
        disableInteractive
        enterDelay={2000}
        enterNextDelay={2000}
        leaveDelay={10}
        size='small'
      >
        <IconButton
          sx={{
            color:
              cell.row.values.status === 'B' ? 'success.main' : 'error.main',
          }}
          onClick={e => console.log(cell.row.values.status)}
        >
          <ArrowUpwardIcon
            fontSize='small'
            sx={{
              transform:
                cell.row.values.status === 'A'
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
        onClick={() => console.log(cell.row.values.id)}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        accessor: 'id',
        disableGlobalFilter: true,
      },
      {
        Header: 'Apellidos',
        accessor: 'surname',
        minWidth: 100,
      },

      {
        Header: 'Nombres',
        accessor: 'name',
        minWidth: 100,
      },
      {
        Header: 'Correo',
        accessor: 'email',
        minWidth: 300,
      },
      {
        Header: 'Teléfono',
        accessor: 'phone',
        minWidth: 150,
      },
      {
        Header: 'Estado',
        accessor: 'status',
        minWidth: 100,
        width: 100,
        Cell: ({ cell }) => (
          <div style={{ textAlign: 'center' }}>{cell.row.values.status}</div>
        ),
      },
      {
        Header: 'Acciones',
        accessor: 'actions',
        disableSortBy: true,
        minWidth: 200,
        Cell: ({ cell }) => <Actions cell={cell} />,
      },
    ],
    []
  );

  return columns;
}
