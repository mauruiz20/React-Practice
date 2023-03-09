import React from 'react';
import moment from 'moment/moment';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/*
 * Componente CollapseItem
 * Items expandibles de las filas
 */
const CollapseItem = ({data, column}) => {
    /* Función que se encarga de procesar la información que se mostrará en cada item. */
    const renderData = field => {
        // Si la columna es nula se muestra "-".
        if (!data[field] && data[field] !== 0) {
            return '-';
        }
        // Si la columna es de tipo "dateTime", se formatea la fecha a "DD/MM/YYYY HH:mm".
        else if (column.type === 'dateTime') {
            return moment(data[field]).format('DD/MM/YYYY HH:mm');
        }
        // Si la columna es de tipo "date", se formatea la fecha a "DD/MM/YYYY".
        else if (field.includes('fecha')) {
            return moment(data[field]).format('DD/MM/YYYY');
        }
        // Si "field" incluye "estado", se devuelve un componente con estilos personalizados dependiendo del estado.
        else if (field.includes('estado')) {
            return <Estado data={data} field={field} />;
        }
        // Si ninguna de las condiciones anteriores se cumple, se renderiza el valor del campo tal cual.
        return data[field];
    };

    return (
        <Box className='mytable-collapse__item' key={column.field}>
            <Box className='mytable-collapse__title'>{column.label}</Box>
            <Box className='mytable-collapse__data'>{renderData(column.field)}</Box>
        </Box>
    );
};

const Estado = ({data, field}) => {
    return (
        <Typography
            sx={{
                color: data[field] === 'A' ? 'success.light' : 'error.light',
                fontWeight: 'bold',
                lineHeight: '1',
            }}
        >
            {data[field] === 'A' ? 'Dado de alta' : 'Dado de baja'}
        </Typography>
    );
};

export default CollapseItem;
