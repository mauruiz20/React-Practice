import { Box } from '@mui/material';
import React, { useState } from 'react';
import '../../mytable.css';
import MyCollapse from '../MyCollapse/MyCollapse';

const MyTableRow = ({ row, columns }) => {
    const [open, setOpen] = useState(false);

    const handleCollapse = () => {
        setOpen(!open);
    };

    return (
        <div className='body-row'>
            <div onClick={handleCollapse} className='row'>
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
                                }}
                            >
                                {column.renderCell(row)}
                            </Box>
                        ),
                )}
            </div>
            <MyCollapse row={row} columns={columns} open={open} />
        </div>
    );
};

export default MyTableRow;
