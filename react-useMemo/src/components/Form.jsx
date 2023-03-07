import React from 'react';

const Form = ({filas, setFilas}) => {
    const handleSubmit = evt => {
        evt.preventDefault();
        let maxId = filas[0]?.id || 0;
        for (let i = 1; i < filas.length; i++) {
            if (filas[i].id > maxId) maxId = filas[i].id;
        }

        const newFilas = [...filas];
        newFilas.push({
            id: maxId + 1,
            nombre: evt.target.nombre.value,
            estado: 'A',
        });

        setFilas(newFilas);
    };

    return (
        <form className='form' onSubmit={handleSubmit}>
            <input type={'text'} name='nombre' defaultValue={'Fila 6'} />
            <input type={'submit'} />
        </form>
    );
};

export default Form;
