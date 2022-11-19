import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import db from '../api/clients.json';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Select,
  Typography,
  Tooltip,
  TextField,
  MenuList,
  Chip,
  Fab,
} from '@mui/material';
import { Stack } from '@mui/system';
import ThemeSwitch from './ThemeSwitch';
import StyleContext from '../context/StyleContext';
import CrudForm from './CrudForm';
import CrudModal from './CrudModal';

const State = props => {
  return (
    <Chip
      label={props.data.state}
      color={props.data.state === 'A' ? 'success' : 'error'}
      size='small'
    />
  );
};

const Btn = ({
  data,
  setDataToEdit,
  setOpenForm,
  setOpenModal,
  setDataToDelete,
}) => {
  const handleEdit = () => {
    setDataToEdit(data);
    setOpenForm(true);
  };

  const handleDelete = () => {
    setDataToDelete(data);
    setOpenModal(true);
  };

  const handleState = () => {
    console.log(data.state);
  };

  return (
    <Box className='mytable__body-cell'>
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
        <IconButton sx={{ color: 'primary.main' }} onClick={e => handleEdit(e)}>
          <EditIcon />
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
        size='small'
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
              transform: data.state === 'A' ? 'rotate(180deg)' : 'rotate(0deg)',
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
  );
};

const Table = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState(db);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { darkMode } = useContext(StyleContext);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', hide: 'true' },
    { field: 'surname', headerName: 'Apellidos' },
    { field: 'name', headerName: 'Nombres' },
    {
      field: 'email',
      headerName: 'Correo Electrónico',
      flex: 1.5,
      hide: 'false',
    },
    { field: 'phone', headerName: 'Teléfono' },
    { field: 'date', headerName: 'Fecha de Nacimiento' },
    { field: 'address', headerName: 'Dirección' },
    { field: 'nacionality', headerName: 'Nacionalidad' },
    {
      field: 'state',
      headerName: 'Estado',
      flex: 0.5,
      cellRenderer: State,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      cellRenderer: Btn,
      cellRendererParams: {
        setOpenForm: setOpenForm,
        setOpenModal: setOpenModal,
        setDataToEdit: setDataToEdit,
        setDataToDelete: setDataToDelete,
      },
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  /* Hideable Columns */

  const [visibleColumns, setVisibleColumns] = useState([
    { field: 'name', Header: 'Nombres', visible: true },
    { field: 'surname', Header: 'Apellidos', visible: true },
    { field: 'email', Header: 'Correo Electrónico', visible: true },
    { field: 'phone', Header: 'Teléfono', visible: true },
    { field: 'date', Header: 'Fecha de Nacimiento', visible: true },
    { field: 'address', Header: 'Dirección', visible: true },
    { field: 'nacionality', Header: 'Nacionalidad', visible: true },
    { field: 'state', Header: 'Estado', visible: true },
    { field: 'actions', Header: 'Acciones', visible: true },
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColumnHide = (evt, column) => {
    let newColumn = {
      field: column.field,
      Header: column.Header,
      visible: evt.target.checked,
    };
    let newVisibleColumns = visibleColumns.map(column =>
      column.field === newColumn.field ? newColumn : column
    );
    setVisibleColumns(newVisibleColumns);
    gridRef.current.columnApi.setColumnVisible(
      column.field,
      evt.target.checked
    );
  };

  // const onBtHide = useCallback(() => {
  //   gridRef.current.columnApi.setColumnsVisible(
  //     ['actions', 'email', 'phone', 'nacionality', 'state'],
  //     true
  //   );
  // }, []);

  // const onBtShow = useCallback(() => {
  //   gridRef.current.columnApi.setColumnsVisible(
  //     ['actions', 'email', 'phone', 'nacionality', 'state'],
  //     false
  //   );
  // }, []);

  /* PAGINATION */

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(db.length);

  const onPaginationChanged = useCallback(() => {
    if (gridRef.current.api) {
      setCurrentPage(gridRef.current.api.paginationGetCurrentPage() + 1);
      setTotalPages(gridRef.current.api.paginationGetTotalPages());
    }
  }, []);

  const onPageChange = (evt, newPage) => {
    if (newPage === currentPage + 2) {
      gridRef.current.api.paginationGoToNextPage();
    } else if (newPage === currentPage) {
      gridRef.current.api.paginationGoToPreviousPage();
    } else {
      gridRef.current.api.paginationGoToPage(newPage - 1);
    }
  };

  const paginationNumberFormatter = useCallback(params => {
    return '[' + params.value.toLocaleString() + ']';
  }, []);

  const onPageSizeChanged = useCallback(evt => {
    gridRef.current.api.paginationSetPageSize(Number(evt.target.value));
    setPageSize(evt.target.value);
  }, []);

  /* Busqueda */

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  /* Form */

  const createData = data => {
    console.log(data);
  };

  const updateData = data => {
    console.log(data);
  };

  const deleteData = id => {
    console.log(id);
  };

  return (
    <>
      {/* <div className='test-button-group'>
        <button onClick={onBtHide}>Hide Cols</button>
        <br />
        <button onClick={onBtShow}>Show Cols</button>
      </div> */}

      <Box className='crud-form-search' bgcolor='background.paper'>
        <Typography
          variant='overline'
          display='block'
          sx={{ fontSize: '2rem', textAlign: 'center', lineHeight: '4rem' }}
          color='text.primary'
        >
          Gestión clientes
        </Typography>
        <Box className='crud-form-search__container'>
          <TextField
            className='crud-form-search__input'
            label='Búsqueda'
            variant='outlined'
            type='search'
            size='small'
            autoComplete='off'
            id='filter-text-box'
            onInput={onFilterTextBoxChanged}
          />

          <IconButton
            aria-label='view-columns'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <ViewColumnIcon />
          </IconButton>
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
                          onChange={evt => handleColumnHide(evt, column)}
                          size='small'
                        />
                      }
                      label={column.Header}
                    />
                  </FormGroup>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <ThemeSwitch />

          <Fab
            variant='extended'
            size='medium'
            color='primary'
            onClick={() => setOpenForm(true)}
          >
            Agregar cliente
            <AddCircleIcon sx={{ ml: 1 }} />
          </Fab>
          <CrudForm
            createData={createData}
            updateData={updateData}
            dataToEdit={dataToEdit}
            setDataToEdit={setDataToEdit}
            openForm={openForm}
            setOpenForm={setOpenForm}
          />
          {dataToDelete && (
            <CrudModal
              open={openModal}
              setOpen={setOpenModal}
              dataToDelete={dataToDelete}
              deleteData={deleteData}
            />
          )}
        </Box>
      </Box>

      <Box
        className={darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'}
        style={{ width: '100%', height: 'calc(100vh - 13.6rem)' }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection='multiple' // Options - allows click selection of rows
          pagination={true}
          paginationPageSize={10}
          paginationNumberFormatter={paginationNumberFormatter}
          suppressPaginationPanel={true}
          suppressScrollOnNewData={true}
          onPaginationChanged={onPaginationChanged}
          // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </Box>

      <Box className='pagination' bgcolor='background.paper'>
        <Box className='pagination__container'>
          <FormControl className='pagination__rows' size='small'>
            <InputLabel id='row-select'>Entradas</InputLabel>
            <Select
              labelId='row-select'
              id='row-select'
              label='Entradas'
              value={pageSize}
              onChange={onPageSizeChanged}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <Box className='paganation__msg' color='text.primary'>
            {`Mostrando ${currentPage * pageSize - pageSize + 1} a ${
              pageSize * currentPage > totalRows
                ? totalRows
                : pageSize * currentPage
            } de ${totalRows}`}
          </Box>
        </Box>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            shape='rounded'
            color='primary'
            onChange={onPageChange}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Table;
