import React from 'react';
import Box from '@mui/material/Box';
import {cellStyle} from '../utils/constants';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useStyle} from '../context/StyleContext';

/*
 * Componente HeaderCell
 * Cabeceras de las tablas
 */
const HeaderCell = ({column, orden, setOrden}) => {
    /* Eventos media queries */
    const {mediaQ900, mediaQ1200} = useStyle();

    return (
        <Box
            // Se establece una clase css en el elemento "Box" dependiendo si existe la propiedad "column.order"
            className={column?.order ? 'mytable__head-cell--click' : 'mytable__head-cell'}
            // Se establece un evento "onClick" en el elemento "Box" dependiendo si existe la propiedad "column.order"
            onClick={
                column?.order
                    ? () => {
                          orden === column.order
                              ? setOrden(column.order + 'D')
                              : setOrden(column.order);
                      }
                    : undefined
            }
            // Se establecen estilos "sx" en el elemento "Box" para establecer la anchura, min-anchura y max-anchura si es que existen.
            sx={{
                ...cellStyle,
                width: column?.width,
                minWidth: column?.minWidth,
                maxWidth: column?.maxWidth,
                '&:hover .mytable__head-btn-arrow': {
                    color: 'secondary.main',
                },
            }}
        >
            {/* Se renderiza el valor "column.label" o "column.shortLabel" dependiendo del valor de "mediaQ1200", también depende si existe la propiedad "column.shortLabel" */}
            {column?.shortLabel ? (mediaQ1200 ? column.label : column.shortLabel) : column.label}

            {/* Se renderiza un componente "ArrowUpwardIcon" si existe la propiedad "column.order" y "mediaQ900" es verdadero */}
            {column?.order && mediaQ900 && (
                <ArrowUpwardIcon
                    className='mytable__head-btn-arrow'
                    fontSize='small'
                    sx={{
                        right: column?.right ? column.right : '5px',
                        color: orden.includes(column.order) ? 'secondary.main' : 'transparent',
                        transform: orden === column.order + 'D' ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                />
            )}
        </Box>
    );
};

export default HeaderCell;
