import React, {memo, useCallback} from 'react';

const Tabla = ({filas, setFilas}) => {
    const handleState = useCallback(filaActualizada => {
        filaActualizada = {
            ...filaActualizada,
            estado: filaActualizada.estado === 'A' ? 'B' : 'A',
        };

        setFilas(filasAnteriores =>
            filasAnteriores.map(fila =>
                fila.id === filaActualizada.id ? filaActualizada : fila
            )
        );
    }, []);

    const handleDelete = useCallback(id => {
        setFilas(filasAnteriores =>
            filasAnteriores.filter(fila => fila.id !== id)
        );
    }, []);

    return (
        <div className='tabla'>
            {filas.map(fila => (
                <Fila
                    key={fila.id}
                    fila={fila}
                    handleState={handleState}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

const Fila = memo(({fila, handleState, handleDelete}) => {
    const handleActualizar = () => {
        handleState({...fila});
    };

    const handleBorrar = () => {
        handleDelete(fila.id);
    };

    return (
        <div className='fila'>
            <div>{fila.id}</div>
            <div>{fila.nombre}</div>
            <div>{fila.estado}</div>
            <button onClick={handleActualizar}>Estado</button>
            <button onClick={handleBorrar}>Borrar</button>
        </div>
    );
});

export default Tabla;
