/* Fields control */

export const messages = {
    required: 'Campo obligatorio',
    onlyAlphabetic: 'Solo se acepta letras y espacios en blanco',
    email: 'Correo incorrecto',
    passwordLength: 'Mínimo 6 caracteres',
};

export const patterns = {
    onlyAlphabetic: /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/,
    email: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/,
};

// Estilos para los bordes de las celdas

export const cellStyle = {
    borderRight: '1px',
    borderRightStyle: 'solid',
    borderRightColor: 'table.border',
};

export const rowStyle = {
    backgroundColor: 'table.rowOdd',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'table.border',
    '&:nth-of-type(even)': {
        backgroundColor: 'table.rowEven',
    },
    '&:hover': {
        backgroundColor: 'table.rowHover',
    },
};

export const urlUsuarios = 'http://localhost:8080/api/usuarios';
