import React from 'react';
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useExpanded,
  usePagination,
  useFlexLayout,
} from 'react-table';
import useRows from '../hooks/useRows';
import useColumns from '../hooks/useColumns';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Stack } from '@mui/system';
import { MenuItem, Pagination, Select } from '@mui/material';

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
      initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['id'] },
    },
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useFlexLayout
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className='tcell'>
                    <div>{column.render('Header')}</div>
                    {column.canSort ? (
                      <ArrowUpwardIcon
                        sx={{
                          transform: column.isSortedDesc
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                          color: column.isSorted ? 'info.main' : '#fff',
                          padding: '0 0.5rem',
                        }}
                        fontSize='small'
                      />
                    ) : (
                      ''
                    )}
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
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Stack spacing={2} backgroundColor='#fff'>
        <Pagination
          count={pageOptions.length}
          shape='rounded'
          color='primary'
          onChange={handleChage}
        />
      </Stack>
      <Select
        sx={{ bgcolor: '#fff', width: '100px' }}
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
    </>
  );
};

export default Table;
