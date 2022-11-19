import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import db from '../api/clients.json';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

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
  Grid as MuiGrid,
  Select,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

const Btn = props => {
  const handleEdit = () => {
    console.log(props.data);
  };

  const handleDelete = () => {
    console.log(props.data.id);
  };

  const handleState = () => {
    console.log(props.data.state);
  };

  return (
    <>
      <button onClick={handleEdit}>Editar</button>
      <button onClick={handleDelete}>Borrar</button>
      <button onClick={handleState}>Dar de alta</button>
    </>
  );
};

const Table = () => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState(db);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', hide: 'true' },
    { field: 'surname', headerName: 'Apellidos', hide: 'false' },
    { field: 'name', headerName: 'Nombres', hide: 'false' },
    {
      field: 'email',
      headerName: 'Correo Electrónico',
      flex: 1.5,
      hide: 'false',
    },
    { field: 'phone', headerName: 'Teléfono', hide: 'false' },
    { field: 'date', headerName: 'Fecha de Nacimiento', hide: 'false' },
    { field: 'address', headerName: 'Dirección', hide: 'false' },
    { field: 'nacionality', headerName: 'Nacionalidad', hide: 'false' },
    {
      field: 'state',
      headerName: 'Estado',
      flex: 0.5,
      hide: 'false',
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      cellRenderer: Btn,
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

  const [actionsShow, setActionsShow] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCbEmail = event => {
    if (gridRef.current) {
      gridRef.current.columnApi.setColumnVisible('email', event.target.checked);
    }
  };

  const handleColumnHide = evt => {
    setActionsShow(evt.target.checked);
    gridRef.current.columnApi.setColumnVisible('actions', evt.target.checked);
  };

  const onBtHide = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'state', hide: true },
        { colId: 'nacionality', hide: true },
      ],
    });
  }, []);

  const onBtShow = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'state', hide: false },
        { colId: 'nacionality', hide: false },
      ],
    });
  }, []);

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

  return (
    <>
      <div className='test-button-group'>
        <button onClick={onBtHide}>Hide Cols</button>
        <br />
        <button onClick={onBtShow}>Show Cols</button>
      </div>

      <label>
        <input type='checkbox' defaultChecked onChange={onCbEmail} />
        Correo
      </label>
      <div>
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
          <Typography variant='h5' m={2}>
            Columnas visibles
          </Typography>
          <MuiGrid container spacing={2}>
            <MuiGrid item xs={12}>
              <FormGroup sx={{ margin: 2 }}>
                <FormControlLabel
                  control={
                    <input
                      type='checkbox'
                      checked={actionsShow}
                      onChange={evt => handleColumnHide(evt)}
                    />
                  }
                  label='column'
                />
              </FormGroup>
            </MuiGrid>
          </MuiGrid>
        </Menu>
      </div>

      <input
        type='text'
        id='filter-text-box'
        placeholder='Filter...'
        onInput={onFilterTextBoxChanged}
      />
      <div
        className='ag-theme-alpine'
        style={{ width: '100%', height: 'calc(100vh - 10rem)' }}
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
      </div>

      <Box className='pagination'>
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
          <Box className='paganation__msg'>
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
