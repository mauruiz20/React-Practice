import React, {useCallback, useEffect, useState, useMemo} from 'react';
import Form from './components/Form';
import {StyledDiv} from './components/StyledDiv';
import Tabla from './components/Tabla';

// const ListMemo = React.memo(props => {
//     const {list, handleDelete} = props;
//     return (
//         <div className='hijo'>
//             <h2>{'Lista memorizada'}</h2>
//             <p>{'Último render: ' + new Date().getMilliseconds()}</p>
//             {list.map(item => (
//                 <div key={item.id}>
//                     <span style={{marginRight: 10}}>
//                         {`Id: ${item.id}, Nombre: ${item.nombre}`}
//                     </span>
//                     <button
//                         onClick={() => {
//                             handleDelete(item.id);
//                         }}
//                     >
//                         {'Eliminar'}
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// });

// const List = props => {
//     const {list, handleDelete} = props;
//     return (
//         <div className='hijo'>
//             <h2>{'Lista memorizada'}</h2>
//             <p>{'Último render: ' + new Date().getMilliseconds()}</p>
//             {list.map(item => (
//                 <div key={item.id}>
//                     <span style={{marginRight: 10}}>
//                         {`Id: ${item.id}, Nombre: ${item.nombre}`}
//                     </span>
//                     <button
//                         onClick={() => {
//                             handleDelete(item.id);
//                         }}
//                     >
//                         {'Eliminar'}
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const Component = () => {
//     const [counter1, setCounter1] = useState(0);
//     const [list, setList] = useState([]);
//     const [id, setId] = useState(0);
//     const [update, setUpdate] = useState(0);

//     useEffect(() => {
//         let interval = setInterval(() => {
//             setCounter1(counter1 + 1);
//             if (counter1 >= 500) {
//                 let tList = list;
//                 tList.push({
//                     id: id,
//                     nombre: 'Producto' + id,
//                 });
//                 setList(tList);
//                 setId(id + 1);
//                 setCounter1(0);
//                 setUpdate(!update);
//             }
//         }, 25);
//         return () => {
//             clearInterval(interval);
//         };
//     }, [counter1]);

//     const handleDelete = id => {
//         const tList = list.filter(item => {
//             return item.id !== id;
//         });
//         setList(tList);
//         setUpdate(!update);
//     };

//     //useMemo
//     const listUseMemo = useMemo(
//         () => <List list={list} update={update} handleDelete={handleDelete} />,
//         [update]
//     );

//     return (
//         <div
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 gap: '1rem',
//                 margin: '1rem',
//             }}
//         >
//             <h1>{'EWebik mejorando el rendimiento useCallback y useMemo'}</h1>
//             <div className='hijos'>
//                 <div>Contador: {counter1}</div>
//             </div>
//             <div className='hijos'>{listUseMemo}</div>
//         </div>
//     );
// };

const App = () => {
    const [filas, setFilas] = useState([
        {id: 1, nombre: 'Fila 1', estado: 'A'},
        {id: 2, nombre: 'Fila 2', estado: 'B'},
        {id: 3, nombre: 'Fila 3', estado: 'A'},
        {id: 4, nombre: 'Fila 4', estado: 'B'},
        {id: 5, nombre: 'Fila 5', estado: 'B'},
    ]);

    return (
        <div className='container'>
            <Form filas={filas} setFilas={setFilas} />
            <Tabla filas={filas} setFilas={setFilas} />
        </div>
    );
};

export default App;
