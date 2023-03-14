import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React from 'react';
import MyPagination from './components/MyPagination/MyPagination';
import { MyTableRow } from './components/MyTableRow';
import './mytable.css';

const MyTable = ({ rows, columns, rowId, orderState = {}, pagination = {} }) => {
    const { order, setOrder } = orderState;
    const { numRows, rowCount, setRowCount, page, setPage } = pagination;

    const handleOrder = (newOrder) => {
        setOrder(order === newOrder ? order + 'D' : newOrder);
    };

    const renderRows = () => {
        if (rows.length > 0) {
            return rows.map((row) => <MyTableRow key={rowId(row)} row={row} columns={columns} />);
        } else {
            return <div className='mytable__empty'>Sin entradas</div>;
        }
    };

    return (
        <>
            <div className='table'>
                <div className='row head-row'>
                    {columns.map(
                        (column) =>
                            column.visible && (
                                <Box
                                    key={column.field}
                                    className='cell'
                                    sx={{
                                        flexGrow: column?.flex,
                                        width: column?.width,
                                        minWidth: column?.minWidth,
                                        textAlign: column?.align,
                                    }}
                                >
                                    {column.label}
                                    {column?.order && (
                                        <IconButton
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                right: 5,
                                                opacity: order.includes(column.order) ? 1 : 0.3,
                                                backgroundColor: order.includes(column.order)
                                                    ? '#3e3e46'
                                                    : 'transparent',
                                                transform:
                                                    order === column.order + 'D'
                                                        ? 'rotate(180deg)'
                                                        : 'rotate(0deg)',
                                                transition: 'opacity 0.4s, transform 0.4s',

                                                '&:hover': {
                                                    opacity: order.includes(column.order)
                                                        ? 1
                                                        : 0.95,
                                                    backgroundColor: '#3e3e46',
                                                },
                                            }}
                                            onClick={() => handleOrder(column.order)}
                                        >
                                            <ArrowUpwardIcon
                                                fontSize='small'
                                                color={
                                                    order.includes(column.order)
                                                        ? 'primary'
                                                        : 'disabled'
                                                }
                                            />
                                        </IconButton>
                                    )}
                                </Box>
                            ),
                    )}
                </div>

                {renderRows()}
            </div>

            {pagination ? (
                <MyPagination
                    numRows={numRows}
                    rowCount={rowCount}
                    setRowCount={setRowCount}
                    page={page}
                    setPage={setPage}
                />
            ) : undefined}
        </>
    );
};

MyTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default MyTable;
