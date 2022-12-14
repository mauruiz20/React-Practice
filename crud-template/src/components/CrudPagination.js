import React, { useContext } from 'react';
import CrudContext from '../context/CrudContext';
import StyleContext from '../context/StyleContext';
import {
  Pagination,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

const CrudPagination = () => {
  const { numRows, rowCount, setRowCount, page, setPage } =
    useContext(CrudContext);
  const { mediaQ768 } = useContext(StyleContext);

  /* Función que controla el cambio de cantidad de filas */
  const handleChange = evt => {
    setRowCount(evt.target.value);
    setPage(1);
  };

  /* Función que controla el cambio de paginas */
  const handlePage = (evt, value) => {
    setPage(value);
    setTimeout(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight });
    }, 100);
  };

  return (
    <div className='pagination'>
      <div className='pagination__container'>
        <FormControl className='pagination__rows' size='small'>
          <InputLabel id='rows-select'>Entradas</InputLabel>
          <Select
            labelId='rows-select'
            value={rowCount}
            label='Entradas'
            onChange={handleChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <div className='pagination__msg'>
          {`Mostrando ${page * rowCount - rowCount + 1} - ${
            page * rowCount < numRows ? page * rowCount : numRows
          } de ${numRows}`}
        </div>
      </div>

      {numRows > rowCount && (
        <Pagination
          className='pagination__nav'
          count={parseInt(Math.ceil(numRows / rowCount))}
          color='primary'
          size={!mediaQ768 ? 'medium' : 'large'}
          page={page}
          onChange={handlePage}
        />
      )}
    </div>
  );
};

export default CrudPagination;
