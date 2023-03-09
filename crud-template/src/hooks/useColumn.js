import {useEffect, useState} from 'react';
import {useStyle} from '../context/StyleContext';

const useColumn = initialColumns => {
    /* Funcionalidades para manipular las columnas (Renderizado lado del usuario) */
    const {mediaQ560, mediaQ1024} = useStyle();
    const [visibleColumns, setVisibleColumns] = useState(initialColumns);

    /* Efecto que muestra/oculta columnas en función de Media Queries */
    useEffect(() => {
        handleResetColumns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mediaQ1024, mediaQ560]);

    /* Función que oculta columnas */
    const handleColumnHide = (checked, column) => {
        let newColumn = {
            field: column.field,
            label: column.label,
            shortLabel: column?.shortLabel,
            type: column?.type,
            null: column?.null,
            order: column?.order,
            right: column?.right,
            width: column?.width,
            minWidth: column?.minWidth,
            maxWidth: column?.maxWidth,
            visible: checked,
            columnVisible: column.columnVisible,
        };

        let newVisibleColumns = visibleColumns.map(columnEl =>
            columnEl.field === newColumn.field ? newColumn : columnEl,
        );

        setVisibleColumns(newVisibleColumns);
    };

    /* Función que reinicia la visibilidad de las columnas */
    const handleResetColumns = () => {
        setVisibleColumns(initialColumns);
    };

    return {visibleColumns, setVisibleColumns, handleColumnHide, handleResetColumns};
};

export default useColumn;
