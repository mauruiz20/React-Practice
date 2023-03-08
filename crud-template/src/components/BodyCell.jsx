import React from 'react';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import {cellStyle} from '../utils/constants';

/*
 * Componente BodyCell
 * Celdas del cuerpo de las tablas
 */
const BodyCell = ({data, column}) => {
    /* Función que se encarga de procesar la información que se mostrará en cada celda. */
    const renderData = field => {
        // Si la columna es nula se muestra "-".
        if (!data[field] && data[field] !== 0) {
            return '-';
        }
        // Si la columna es de tipo "dateTime", se formatea la fecha a "DD/MM/YYYY HH:mm" y si es nula se muestra "-".
        else if (column.type === 'dateTime') {
            return moment(data[field]).format('DD/MM/YYYY HH:mm') + 'Hs';
        }
        // Si la columna es de tipo "date", se formatea la fecha a "DD/MM/YYYY".
        else if (field.includes('fecha')) {
            return moment(data[field]).format('DD/MM/YYYY');
        }
        // Si el campo incluye "estado", se renderiza un componente Chip con el texto "A" o "B" y el color verde o rojo dependiendo del valor del campo.
        else if (field.includes('estado')) {
            return <Estado data={data} field={field} />;
        }

        // Si ninguna de las condiciones anteriores se cumple, se renderiza el valor del campo tal cual.
        return data[field];
    };

    return (
        <Box
            // Si el campo "field" incluye "estado" pero no es "estadoFactura" el contenido se centra.
            className={
                column.field.includes('estado') && column.field !== 'estadoFactura'
                    ? 'mytable__body-cell--center'
                    : 'mytable__body-cell'
            }
            // Se utiliza el campo "field" de la prop "column" como key para cada celda.
            key={column.field}
            // Se establecen estilos "sx" en el elemento "Box" para establecer la anchura, min-anchura y max-anchura si es que existen.
            sx={{
                ...cellStyle,
                width: column?.width,
                minWidth: column?.minWidth,
                maxWidth: column?.maxWidth,
            }}
        >
            {renderData(column.field)}
        </Box>
    );
};

const Estado = ({data, field}) => {
    return (
        <Chip
            label={data[field] === 'A' ? 'A' : 'B'}
            color={data[field] === 'A' ? 'success' : 'error'}
            size='small'
            sx={{minWidth: '30px', cursor: 'pointer'}}
        />
    );
};

export default BodyCell;
