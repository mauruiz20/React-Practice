import {useState} from 'react';
import {useCrud} from '../context/CrudContext';
import Box from '@mui/material/Box';
import CollapsePanel from './CollapsePanel';
import {rowStyle} from '../utils/constants';
import BodyCell from './BodyCell';

const CrudTableRow = ({data}) => {
    const [open, setOpen] = useState(false);
    const {visibleColumns} = useCrud();

    /* Manejador de la fila collapse */
    const handleAccordion = () => {
        setOpen(!open);
    };

    return (
        <Box onClick={handleAccordion} sx={rowStyle}>
            <Box className='mytable__body-row'>
                {visibleColumns.map(
                    column =>
                        column.visible && (
                            <BodyCell key={column.field} data={data} column={column} />
                        ),
                )}
            </Box>
            <CollapsePanel open={open} data={data} visibleColumns={visibleColumns} />
        </Box>
    );
};

export default CrudTableRow;
