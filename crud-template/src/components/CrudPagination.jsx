import React from 'react';
import {useCrud} from '../context/CrudContext';
import {useStyle} from '../context/StyleContext';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CrudPagination = () => {
    const {state, handleSetRowCount, handleSetPage} = useCrud();
    const {numRows, rowCount, page} = state;
    const {mediaQ768} = useStyle();

    /* Función que controla el cambio de cantidad de filas */
    const handleChange = evt => {
        handleSetRowCount(evt.target.value);
    };

    /* Función que controla el cambio de paginas */
    const handlePage = (evt, value) => {
        handleSetPage(value);
        setTimeout(() => {
            window.scrollTo({top: document.documentElement.scrollHeight});
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
