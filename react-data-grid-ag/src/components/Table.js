import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CrudContext from '../context/CrudContext';
import StyleContext from '../context/StyleContext';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
  TextField,
  Fab,
  Stack,
} from '@mui/material';
import CrudForm from './CrudForm';
import DialogDelete from './DialogDelete';
import ColumnHidding from './ColumnHidding';
import ActionsColumn from './ActionsColumn';
import StateColumn from './StateColumn';
import StateNameColumn from './StateNameColumn';

const Table = () => {
  const gridRef = useRef();
  const [openForm, setOpenForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const {
    db: rowData,
    dataToDelete,
    showInactives,
    setShowInactives,
  } = useContext(CrudContext);

  const { darkMode, mediaQ1024, mediaQ768, mediaQ560 } =
    useContext(StyleContext);

  /* ============== Column Hidding Functions ============== */

  const initialVisibleColumns = [
    { field: 'name', Header: 'Nombres', visible: true },
    { field: 'surname', Header: 'Apellidos', visible: true },
    { field: 'email', Header: 'Correo Electrónico', visible: true },
    { field: 'phone', Header: 'Teléfono', visible: true },
    { field: 'date', Header: 'Fecha de Nacimiento', visible: true },
    { field: 'address', Header: 'Dirección', visible: true },
    { field: 'nacionality', Header: 'Nacionalidad', visible: true },
    { field: 'state', Header: 'Estado', visible: true },
    { field: 'actions', Header: 'Acciones', visible: true },
  ];

  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

  const handleColumnHide = (checked, column) => {
    let newColumn = {
      field: column.field,
      Header: column.Header,
      visible: checked,
    };

    let newVisibleColumns = visibleColumns.map(columnEl =>
      columnEl.field === newColumn.field ? newColumn : columnEl
    );

    setVisibleColumns(newVisibleColumns);

    if (gridRef.current.columnApi) {
      gridRef.current.columnApi.setColumnVisible(column.field, checked);
    }
  };

  useEffect(() => {
    if (!mediaQ1024) {
      handleColumnsHide([
        {
          field: 'email',
          Header: 'Correo Electrónico',
          visible: false,
        },
      ]);
      if (gridRef.current.columnApi) {
        gridRef.current.columnApi.setColumnsVisible(['email'], false);
      }
    }
    if (!mediaQ768) {
      handleColumnsHide([
        {
          field: 'email',
          Header: 'Correo Electrónico',
          visible: false,
        },
        {
          field: 'date',
          Header: 'Fecha de Nacimiento',
          visible: false,
        },
        {
          field: 'state',
          Header: 'Estado',
          visible: false,
        },
        {
          field: 'address',
          Header: 'Dirección',
          visible: false,
        },
      ]);
      if (gridRef.current.columnApi) {
        gridRef.current.columnApi.setColumnsVisible(
          ['email', 'date', 'state', 'address'],
          false
        );
      }
    }
    if (!mediaQ560) {
      handleColumnsHide([
        {
          field: 'email',
          Header: 'Correo Electrónico',
          visible: false,
        },
        {
          field: 'date',
          Header: 'Fecha de Nacimiento',
          visible: false,
        },
        {
          field: 'state',
          Header: 'Estado',
          visible: false,
        },
        {
          field: 'address',
          Header: 'Dirección',
          visible: false,
        },
        {
          field: 'nacionality',
          Header: 'Nacionalidad',
          visible: false,
        },
      ]);
      if (gridRef.current.columnApi) {
        gridRef.current.columnApi.setColumnsVisible(
          ['email', 'date', 'state', 'address', 'nacionality'],
          false
        );
      }
    }
  }, [mediaQ1024, mediaQ768, mediaQ560]);

  const handleColumnsHide = columns => {
    visibleColumns.forEach(el => {
      columns.forEach(el2 => {
        if (el.field === el2.field) {
          el.visible = false;
        }
      });
    });
  };

  const handleResetColumns = () => {
    setVisibleColumns(initialVisibleColumns);
    gridRef.current.columnApi.setColumnsVisible(
      [
        'name',
        'surname',
        'email',
        'phone',
        'date',
        'address',
        'nacionality',
        'state',
        'actions',
      ],
      true
    );
  };

  // Each Column Definition results in one Column

  const columnDefs = [
    { field: 'id', hide: 'true' },
    {
      field: 'surname',
      headerName: 'Apellidos',
      cellRenderer: StateNameColumn,
    },
    { field: 'name', headerName: 'Nombres' },
    {
      field: 'email',
      headerName: 'Correo Electrónico',
      flex: 1.2,
      initialHide: !mediaQ1024,
    },
    {
      field: 'phone',
      headerName: 'Teléfono',
      flex: 0.8,
    },
    {
      field: 'date',
      headerName: 'Fecha de Nacimiento',
      flex: 0.8,
      initialHide: !mediaQ768,
    },
    { field: 'address', headerName: 'Dirección', initialHide: !mediaQ768 },
    {
      field: 'nacionality',
      headerName: 'Nacionalidad',
      initialHide: !mediaQ560,
      flex: 0.8,
    },
    {
      field: 'state',
      headerName: 'Estado',
      maxWidth: 80,
      minWidth: 1,
      cellRenderer: StateColumn,

      initialHide: !mediaQ768,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      maxWidth: !mediaQ560 ? 90 : 140,
      minWidth: !mediaQ560 ? 50 : 140,
      sortable: false,
      cellRenderer: ActionsColumn,
      cellRendererParams: {
        setOpenForm: setOpenForm,
        setOpenModal: setOpenModal,
        gridRef: gridRef,
      },
    },
  ];

  // DefaultColDef sets props common to all Columns

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  /* ============== Pagination Functions ============== */

  const totalRows = rowData && rowData.length;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setPageSize] = useState(25); // Initial pageSize

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

  /* ============== Search Function ============== */

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById('filter-text-box').value
    );
  }, []);

  return (
    <>
      <Box className='crud-form-search' bgcolor='background.paper'>
        <Typography
          variant='overline'
          display='block'
          sx={{ fontSize: '2rem', textAlign: 'center', lineHeight: '4rem' }}
          color='text.primary'
        >
          Gestión clientes
        </Typography>

        {/* ============== Form Search ============== */}

        <Box className='crud-form-search__container'>
          <Box className='crud-form-search__tools'>
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

            <FormControlLabel
              control={
                <Checkbox
                  checked={showInactives}
                  sx={{
                    margin: '0 0 0 1rem',
                  }}
                  onChange={evt => setShowInactives(evt.target.checked)}
                />
              }
              label='Incluir bajas'
              sx={{ userSelect: 'none', color: 'text.primary' }}
            />

            <ColumnHidding
              visibleColumns={visibleColumns}
              handleColumnHide={handleColumnHide}
              handleResetColumns={handleResetColumns}
            />
          </Box>

          <Fab
            variant='extended'
            size='medium'
            color='primary'
            onClick={() => setOpenForm(true)}
            sx={{ minWidth: '205px' }}
          >
            Agregar cliente
            <AddCircleIcon sx={{ ml: 1 }} />
          </Fab>

          <CrudForm openForm={openForm} setOpenForm={setOpenForm} />

          {dataToDelete && (
            <DialogDelete open={openModal} setOpen={setOpenModal} />
          )}
        </Box>
      </Box>

      {/* ============== Table ============== */}

      <Box
        className={`${
          darkMode ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'
        } mytable-container`}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection='multiple'
          pagination={true}
          paginationPageSize={25}
          paginationNumberFormatter={paginationNumberFormatter}
          suppressPaginationPanel={true}
          suppressScrollOnNewData={true}
          onPaginationChanged={onPaginationChanged}
        />
      </Box>

      {/* ============== Pagination ============== */}

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
