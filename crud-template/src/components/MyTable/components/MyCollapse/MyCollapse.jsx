import Collapse from '@mui/material/Collapse';
import React from 'react';

const MyCollapse = ({ row, columns, open }) => {
    return (
        <Collapse in={open} timeout='auto' unmountOnExit className='collapse'>
            {columns.map(
                (column) =>
                    !column.visible && (
                        <div
                            key={column.field}
                            className='collapse-item'
                            style={{ flexGrow: column?.flex ?? 1 }}
                        >
                            <div className='collapse-item-title'>{column.label}</div>
                            <div className='collapse-item-data'>{column.renderCell(row)}</div>
                        </div>
                    ),
            )}
        </Collapse>
    );
};

export default MyCollapse;
