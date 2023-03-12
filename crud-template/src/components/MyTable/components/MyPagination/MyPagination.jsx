import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import React from 'react';

const MyPagination = ({ numRows, rowCount, setRowCount, page, setPage }) => {
    const handleChange = (evt) => {
        setRowCount(evt.target.value);
    };

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
                    <InputLabel id='rows-select'>Filas</InputLabel>
                    <Select
                        labelId='rows-select'
                        value={rowCount}
                        label='Filas'
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
                    shape='rounded'
                    color='primary'
                    size='medium'
                    page={page}
                    onChange={handlePage}
                />
            )}
        </div>
    );
};

export default MyPagination;
