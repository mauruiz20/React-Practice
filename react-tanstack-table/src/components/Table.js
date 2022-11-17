import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  useExpanded,
  usePagination,
  useResizeColumns,
  useFlexLayout,
} from 'react-table';
import useRows from '../hooks/useRows';
import useColumns from '../hooks/useColumns';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Stack } from '@mui/system';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TableSortLabel,
  TextField,
  Typography,
} from '@mui/material';

/* Search rows */

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(
    value => setGlobalFilter(value || undefined),
    200
  );

  return (
    <Box>
      <TextField
        label='Búsqueda'
        variant='outlined'
        value={value || ''}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </Box>
  );
};

/* React Table options */

const Table = () => {
  const handleChage = (evt, newPage) => {
    if (newPage === pageIndex + 2) {
      nextPage();
    } else if (newPage === pageIndex) {
      previousPage();
    } else {
      gotoPage(newPage - 1);
    }
  };

  const columns = useColumns();
  const data = useRows();
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        hiddenColumns: ['id'],
      },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useFlexLayout,
    useResizeColumns
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    allColumns,
    page,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  /* Hideable Columns */

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hideableColumns = allColumns.filter(
    column => !(column.id === '_selector')
  );
  const checkedCount = hideableColumns.reduce(
    (acc, val) => acc + (val.isVisible ? 0 : 1),
    0
  );
  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;

  return (
    <>
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
        >
          <Typography variant='h5' m={4}>
            Columnas visibles
          </Typography>
          <Grid container spacing={2} sx={{ padding: '2rem' }}>
            {allColumns.map(column =>
              column.id !== 'id' ? (
                <Grid item xs={4} key={column.id}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          {...column.getToggleHiddenProps()}
                          disabled={column.isVisible && onlyOneOptionLeft}
                        />
                      }
                      label={column.Header}
                    />
                  </FormGroup>
                </Grid>
              ) : (
                ''
              )
            )}
          </Grid>
        </Menu>
      </div>
      <div>
        <br />
      </div>
      <GlobalFilter
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className='tcell'>
                    <div>{column.render('Header')}</div>
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <>
                <tr
                  {...row.getRowProps()}
                  onClick={() => row.toggleRowExpanded()}
                >
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded ? (
                  <tr>
                    <td>hola</td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
      <div className='pagination'>
        <div className='pagination__container'>
          <Select
            className='pagination__rows'
            label='Entradas'
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 25, 50].map(pageSize => (
              <MenuItem key={pageSize} value={pageSize}>
                {pageSize}
              </MenuItem>
            ))}
          </Select>
          <div>
            Mostrando{' '}
            <strong> {`${(pageIndex + 1) * pageSize - pageSize + 1}`} </strong>{' '}
            -
            <strong>{` ${
              (pageIndex + 1) * pageSize < data.length
                ? (pageIndex + 1) * pageSize
                : data.length
            }`}</strong>{' '}
            de <strong>{` ${data.length} `}</strong>
          </div>
        </div>
        <Stack spacing={2}>
          <Pagination
            count={pageOptions.length}
            shape='rounded'
            color='primary'
            onChange={handleChage}
          />
        </Stack>
      </div>
    </>
  );
};

export default Table;
