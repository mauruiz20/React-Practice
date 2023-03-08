import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
// import {useStyle} from '../context/StyleContext';
import useAlert from '../hooks/useAlert';
import useColumn from '../hooks/useColumn';
import {urlUsuarios} from '../utils/constants';

const CrudContext = createContext();

const CrudProvider = ({children}) => {
    /* Estados que manejan los datos que se muestran en la tabla */
    const [db, setDb] = useState(null);
    const [numRows, setNumRows] = useState(0);
    const [page, setPage] = useState(1);
    const [rowCount, setRowCount] = useState(25);
    const [cadena, setCadena] = useState('');
    const [orden, setOrden] = useState('A');
    const [incluyeBajas, setIncluyeBajas] = useState(true);

    /* Estados para modificar datos */
    const [dataToEdit, setDataToEdit] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [modalData, setModalData] = useState({});

    /* Estados para manipular el consumo de API's */
    const [loading, setLoading] = useState(false);

    // const {mediaQ1024, mediaQ560} = useStyle();

    /* Columnas que se mostrarán al cargar la página (Renderizado lado del usuario) */
    const initialColumns = [
        {field: 'apellidos', label: 'Apellidos', order: 'A', visible: true},
        {field: 'nombres', label: 'Nombres', order: 'N', visible: true},
        {field: 'correo', label: 'Correo Electrónico', order: 'C', visible: true},
        {field: 'nacimiento', label: 'Fecha de Nacimiento', visible: true},
        {field: 'estadoUsuario', label: 'Estado', visible: true},
    ];

    const {showMsgAlert, setError} = useAlert();

    /* HTTP GET request */
    const getData = () => {
        let offSet = (page - 1) * rowCount;

        let endpoint = `${urlUsuarios}?cadena=${cadena}&incluyeBajas=${
            incluyeBajas ? 'S' : 'N'
        }&orden=${orden}&offSet=${offSet}&rowCount=${rowCount}`;

        setLoading(true); // Muestra loader
        axios
            .get(endpoint)
            .then(response => {
                setDb(response.data.results); // Actualiza los datos
                setNumRows(response.data.numRows); // Actualiza número total de datos
                setError(null); // Sin errores
            })
            .catch(error => {
                setDb(null); // Limpia los datos
                setError(error.message); // Muestra error
            })
            .finally(() => setLoading(false)); // Quita el loader
    };

    /* Efecto que realiza el GET Request en caso de actualizar los estados indicados */
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cadena, incluyeBajas, page, rowCount, orden]);

    /* HTTP POST request */
    const createData = data => {
        delete data.idUsuario; // No se manda el id en el body
        //console.log(data);
        setLoading(true); // Muestra loader
        axios
            .post(urlUsuarios, data)
            .then(response => {
                getData(); // Actualiza los datos
                showMsgAlert(
                    // Muestra mensaje de éxito o de advertencia
                    response.data,
                    response.data.includes('éxito') ? 'success' : 'warning',
                );
            })
            .catch(error => {
                setError(error.message); // Muestra error
            })
            .finally(() => setLoading(false)); // Quita el loader
    };

    /* HTTP PUT request (Modificar) */
    const updateData = data => {
        let endpoint = `${urlUsuarios}/${data.idUsuario}`;
        setLoading(true); // Muestra loader

        axios
            .put(endpoint, data)
            .then(response => {
                // Actualiza los datos (Renderizado lado del usuario)
                // let newData = db.map(el =>
                //   el.idUsuario === data.idUsuario ? data : el
                // );
                // setDb(newData);
                getData(); // Actualiza los datos
                showMsgAlert(
                    // Muestra mensaje de éxito o de advertencia
                    response.data,
                    response.data.includes('éxito') ? 'success' : 'warning',
                );
            })
            .catch(error => {
                setError(error.message); // Muestra error
            })
            .finally(() => setLoading(false)); // Quita el loader
    };

    /* HTTP PATCH request (Dar alta o baja) */
    const handleStateData = data => {
        let endpoint = `${urlUsuarios}/${data.idUsuario}/alta`;
        if (data.estadoUsuario === 'A') {
            endpoint = `${urlUsuarios}/${data.idUsuario}/baja`;
        }

        setLoading(true); // Muestra loader
        axios
            .patch(endpoint, null)
            .then(response => {
                // Actualiza los datos (Renderizado lado del usuario)
                data.estadoUsuario = data.estadoUsuario === 'A' ? 'B' : 'A';
                let newData = db.map(el => (el.idUsuario === data.idUsuario ? data : el));
                setDb(newData);
                showMsgAlert(
                    // Muestra mensaje de éxito o de advertencia
                    response.data,
                    response.data.includes('éxito') ? 'success' : 'warning',
                );
            })
            .catch(error => {
                setError(error.message); // Muestra error
            })
            .finally(() => setLoading(false)); // Quita el loader
    };

    /* HTTP DELETE request */
    const deleteData = idUsuario => {
        let endpoint = `${urlUsuarios}/${idUsuario}`;

        setLoading(true); // Muestra loader
        axios
            .delete(endpoint)
            .then(response => {
                // Actualiza los datos (Renderizado lado del usuario)
                let newData = db.filter(el => el.idUsuario !== idUsuario);
                setDb(newData);
                setNumRows(numRows - 1);
                setModalData({});
                showMsgAlert(
                    // Muestra mensaje de éxito o de advertencia
                    response.data,
                    response.data.includes('éxito') ? 'success' : 'warning',
                );
            })
            .catch(error => {
                setError(error.message); // Muestra error
            })
            .finally(() => setLoading(false)); // Quita el loader
    };

    const {visibleColumns, setVisibleColumns, handleColumnHide, handleResetColumns} =
        useColumn(initialColumns);

    const data = {
        db,
        loading,
        dataToEdit,
        setDataToEdit,
        cadena,
        setCadena,
        numRows,
        rowCount,
        setRowCount,
        visibleColumns,
        setVisibleColumns,
        incluyeBajas,
        setIncluyeBajas,
        page,
        setPage,
        orden,
        setOrden,
        modalData,
        setModalData,
        createData,
        updateData,
        handleStateData,
        deleteData,
        handleColumnHide,
        handleResetColumns,
        openForm,
        setOpenForm,
    };

    return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

function useCrud() {
    const context = useContext(CrudContext);
    if (context === undefined) {
        throw new Error('useCount debe usarse dentro de CountProvider');
    }

    return context;
}

export {CrudProvider, useCrud};
