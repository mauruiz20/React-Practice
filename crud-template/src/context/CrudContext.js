import { createContext, useContext, useEffect, useState, useReducer } from 'react';
// import {useStyle} from '../context/StyleContext';
import useAlert from '../hooks/useAlert';
import useColumn from '../hooks/useColumn';
import { urlUsuarios } from '../utils/constants';
import { helpHttp } from '../helpers/helpHttp';

const CrudContext = createContext();

const initialState = {
    db: [],
    numRows: 0,
    page: 1,
    numPages: 1,
    rowCount: 25,
    cadena: '',
    orden: 'A',
    incluyeBajas: true,
    dataToEdit: null,
    openForm: false,
    modalData: {},
    openDelete: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'GET_DATA':
            return {
                ...state,
                db: action.payload.db,
                numRows: action.payload.numRows,
                numPages: action.payload.numPages,
            };
        case 'SET_DB':
            return { ...state, db: action.payload };
        case 'SET_NUM_ROWS':
            return { ...state, numRows: action.payload };
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        case 'SET_ROW_COUNT':
            return { ...state, rowCount: action.payload.rowCount, page: action.payload.page };
        case 'SET_CADENA':
            return { ...state, cadena: action.payload };
        case 'SET_ORDEN':
            return { ...state, orden: action.payload };
        case 'SET_INCLUYE_BAJAS':
            return {
                ...state,
                incluyeBajas: action.payload.incluyeBajas,
                page: action.payload.page,
            };
        case 'SET_DATA_TO_EDIT':
            return { ...state, dataToEdit: action.payload };
        case 'SET_OPEN_FORM':
            return { ...state, openForm: action.payload };
        case 'SET_MODAL_DATA':
            return { ...state, modalData: action.payload };
        case 'SET_OPEN_DELETE':
            return { ...state, openDelete: action.payload };
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

const CrudProvider = ({ children }) => {
    /* Estados que manejan los datos que se muestran en la tabla */
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleGetData(db, numRows, numPages) {
        dispatch({ type: 'GET_DATA', payload: { db, numRows, numPages } });
    }

    function handleSetDb(db) {
        dispatch({ type: 'SET_DB', payload: db });
    }

    function handleSetNumRows(numRows) {
        dispatch({ type: 'SET_NUM_ROWS', payload: numRows });
    }

    function handleSetPage(page) {
        dispatch({ type: 'SET_PAGE', payload: page });
    }

    function handleSetRowCount(rowCount) {
        dispatch({ type: 'SET_ROW_COUNT', payload: { rowCount, page: 1 } });
    }

    function handleSetCadena(cadena) {
        dispatch({ type: 'SET_CADENA', payload: cadena });
    }

    function handleSetOrden(orden) {
        dispatch({ type: 'SET_ORDEN', payload: orden });
    }

    function handleSetIncluyeBajas(incluyeBajas) {
        dispatch({ type: 'SET_INCLUYE_BAJAS', payload: { incluyeBajas, page: 1 } });
    }

    function handleSetDataToEdit(dataToEdit) {
        dispatch({ type: 'SET_DATA_TO_EDIT', payload: dataToEdit });
    }

    function handleSetOpenForm(openForm) {
        dispatch({ type: 'SET_OPEN_FORM', payload: openForm });
    }

    function handleSetModalData(modalData) {
        dispatch({ type: 'SET_MODAL_DATA', payload: modalData });
    }

    function handleSetOpenDelete(openDelete) {
        dispatch({ type: 'SET_OPEN_DELETE', payload: openDelete });
    }

    /* Estados para manipular el consumo de API's */
    const [loading, setLoading] = useState(false);

    // const {mediaQ1024, mediaQ560} = useStyle();

    /* Columnas que se mostrarán al cargar la página (Renderizado lado del usuario) */
    const initialColumns = [
        { field: 'apellidos', label: 'Apellidos', order: 'A', visible: true },
        { field: 'nombres', label: 'Nombres', order: 'N', visible: true },
        { field: 'correo', label: 'Correo Electrónico', order: 'C', visible: true },
        { field: 'nacimiento', label: 'Fecha de Nacimiento', visible: true },
        { field: 'estadoUsuario', label: 'Estado', visible: true, maxWidth: '75px' },
        { field: 'acciones', label: 'Acciones', visible: true, width: '150%', minWidth: '125px' },
    ];

    const { showMsgAlert, setError } = useAlert();

    /* HTTP GET request */
    const getData = async () => {
        let offSet = (state.page - 1) * state.rowCount;

        let endpoint = `${urlUsuarios}?cadena=${state.cadena}&incluyeBajas=${
            state.incluyeBajas ? 'S' : 'N'
        }&orden=${state.orden}&offSet=${offSet}&rowCount=${state.rowCount}`;

        setLoading(true);
        try {
            const db = await helpHttp().get(endpoint);
            handleGetData(db.results, db.numRows, db.numPages);
            setError(null);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /* Efecto que realiza el GET Request en caso de actualizar los estados indicados */
    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.cadena, state.incluyeBajas, state.page, state.rowCount, state.orden]);

    /* HTTP POST request */
    const createData = async (data) => {
        delete data.idUsuario;

        setLoading(true);
        try {
            const response = await helpHttp().post(urlUsuarios, { data });
            showMsgAlert(response, response.includes('éxito') ? 'success' : 'warning');
            getData();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /* HTTP PUT request (Modificar) */
    const updateData = async (data) => {
        let endpoint = `${urlUsuarios}/${data.idUsuario}`;

        setLoading(true);
        try {
            const response = await helpHttp().put(endpoint, { data });
            showMsgAlert(response, response.includes('éxito') ? 'success' : 'warning');
            getData();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /* HTTP PATCH request (Dar alta o baja) */
    const handleStateData = async (data) => {
        let endpoint = `${urlUsuarios}/${data.idUsuario}/alta`;
        if (data.estadoUsuario === 'A') {
            endpoint = `${urlUsuarios}/${data.idUsuario}/baja`;
        }

        setLoading(true);
        try {
            const response = await helpHttp().patch(endpoint);
            data.estadoUsuario = data.estadoUsuario === 'A' ? 'B' : 'A';
            let newData = state.db.map((el) => (el.idUsuario === data.idUsuario ? data : el));
            handleSetDb(newData);
            showMsgAlert(response, response.includes('éxito') ? 'success' : 'warning');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    /* HTTP DELETE request */
    const deleteData = async (idUsuario) => {
        let endpoint = `${urlUsuarios}/${idUsuario}`;

        setLoading(true);
        try {
            const response = await helpHttp().del(endpoint);
            let newData = state.db.filter((el) => el.idUsuario !== idUsuario);
            handleSetDb(newData);
            handleSetNumRows(state.numRows - 1);
            handleSetModalData({});
            showMsgAlert(response, response.includes('éxito') ? 'success' : 'warning');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const { visibleColumns, setVisibleColumns, handleColumnHide, handleResetColumns } =
        useColumn(initialColumns);

    const data = {
        state,
        handleSetModalData,
        handleSetOpenForm,
        handleSetOpenDelete,
        handleSetCadena,
        handleSetIncluyeBajas,
        handleSetPage,
        handleSetRowCount,
        handleSetOrden,
        handleSetDataToEdit,
        loading,
        visibleColumns,
        setVisibleColumns,
        createData,
        updateData,
        handleStateData,
        deleteData,
        handleColumnHide,
        handleResetColumns,
    };

    return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

function useCrud() {
    const context = useContext(CrudContext);
    if (context === undefined) {
        throw new Error('useCrud debe usarse dentro de CrudProvider');
    }

    return context;
}

export { CrudProvider, useCrud };
