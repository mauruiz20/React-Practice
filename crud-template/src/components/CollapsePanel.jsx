import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CollapseItem from './CollapseItem';

const CrudRowCollapse = ({open, data, visibleColumns}) => {
    return (
        <Collapse in={open} timeout='auto' unmountOnExit className='mytable-collapse'>
            <Box className='mytable-collapse__container'>
                {visibleColumns.map(
                    column =>
                        column.visible === false && (
                            <CollapseItem key={column.field} data={data} column={column} />
                        ),
                )}
            </Box>
        </Collapse>
    );
};

export default CrudRowCollapse;
