import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import StyleContext from '../context/StyleContext';

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
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

  /* Estados que muestran actualizaciones de la tabla */
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /* Estados para manipular el consumo de API's */
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { mediaQ1024, mediaQ560 } = useContext(StyleContext);

  /* Columnas que se mostrarán al cargar la página (Renderizado lado del usuario) */
  const initialVisibleColumns = [
    { field: 'apellidos', Header: 'Apellidos', visible: true },
    { field: 'nombres', Header: 'Nombres', visible: true },
    { field: 'email', Header: 'Correo Electrónico', visible: mediaQ1024 },
    { field: 'estadoUsuario', Header: 'Estado', visible: mediaQ560 },
    { field: 'nacimiento', Header: 'Fecha de Nacimiento', visible: false },
    { field: 'direccion', Header: 'Dirección', visible: false },
    { field: 'rol', Header: 'Rol', visible: true },
  ];

  /* Efecto que muestra un mensaje en pantalla en caso de ocurrir una Exception */
  useEffect(() => {
    let errId;
    if (error) {
      errId = showMsgAlert(error, 'error', true, true);
    } else {
      closeSnackbar(errId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, closeSnackbar]);

  /* Endpoint API Rest */
  let url = 'http://localhost:8080/api/usuarios';
  let token =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYW50ZWNoYW5kbGVyNTEzQGdtYWlsLmNvbSIsImV4cCI6MTY3NDUwODQzNywibm9tYnJlIjoiRGFudGUgQ2hhbmRsZXIifQ.6M2A6EdFXDZ0Ei_nld5CfmLCOmgUhzEjeNrmcTzD6DQ';

  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  /* HTTP GET request */
  const getData = () => {
    let offSet = (page - 1) * rowCount;

    let endpoint = `${url}?cadena=${cadena}&incluyeBajas=${
      incluyeBajas ? 'S' : 'N'
    }&orden=${orden}&offSet=${offSet}&rowCount=${rowCount}`;

    setLoading(true); // Muestra loader
    axios
      .get(endpoint, {
        headers: headers,
      })
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
    data.rol = {
      idRol: data.idRol,
    };
    data.idUsuario = undefined; // No se manda el id en el body
    data.idRol = undefined;
    //console.log(data);
    setLoading(true); // Muestra loader
    axios
      .post(url, data, {
        headers: headers,
      })
      .then(response => {
        getData(); // Actualiza los datos
        showMsgAlert(
          // Muestra mensaje de éxito o de advertencia
          response.data,
          response.data.includes('Usuario') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message); // Muestra error
      })
      .finally(() => setLoading(false)); // Quita el loader
  };

  /* HTTP PUT request (Modificar) */
  const updateData = data => {
    let endpoint = `${url}/${data.idUsuario}`;
    setLoading(true); // Muestra loader

    data.rol = {
      idRol: data.idRol,
    };
    data.idRol = undefined;
    //console.log(data);
    axios
      .put(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
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
          response.data.includes('Usuario') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message); // Muestra error
      })
      .finally(() => setLoading(false)); // Quita el loader
  };

  /* HTTP PATCH request (Dar alta o baja) */
  const handleStateData = data => {
    let endpoint = `${url}/${data.idUsuario}/alta`;
    if (data.estadoUsuario === 'A') {
      endpoint = `${url}/${data.idUsuario}/baja`;
    }

    setLoading(true); // Muestra loader
    axios
      .patch(endpoint, null, {
        headers: headers,
      })
      .then(response => {
        // Actualiza los datos (Renderizado lado del usuario)
        data.estadoUsuario = data.estadoUsuario === 'A' ? 'B' : 'A';
        let newData = db.map(el =>
          el.idUsuario === data.idUsuario ? data : el
        );
        setDb(newData);
        showMsgAlert(
          // Muestra mensaje de éxito o de advertencia
          response.data,
          response.data.includes('Usuario') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message); // Muestra error
      })
      .finally(() => setLoading(false)); // Quita el loader
  };

  /* HTTP DELETE request */
  const deleteData = idUsuario => {
    let endpoint = `${url}/${idUsuario}`;

    setLoading(true); // Muestra loader
    axios
      .delete(endpoint, {
        headers: headers,
      })
      .then(response => {
        // Actualiza los datos (Renderizado lado del usuario)
        let newData = db.filter(el => el.idUsuario !== idUsuario);
        setDb(newData);
        setNumRows(numRows - 1);
        setModalData({});
        showMsgAlert(
          // Muestra mensaje de éxito o de advertencia
          response.data,
          response.data.includes('Usuario') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message); // Muestra error
      })
      .finally(() => setLoading(false)); // Quita el loader
  };

  /* Funcionalidades de la dependencia Snackbar */

  let offlineId;

  /* Mensaje de recuperación de conexión */
  const handleOnline = () => {
    closeSnackbar(offlineId);
    enqueueSnackbar('Conexión recuperada!', {
      variant: 'success',
      preventDuplicate: true,
    });
  };

  /* Mensaje de perdida de conexión */
  const handleOffline = () =>
    (offlineId = enqueueSnackbar('Sin conexión!', {
      variant: 'error',
      persist: 'true',
      preventDuplicate: true,
    }));

  window.addEventListener('offline', handleOffline);

  window.addEventListener('online', handleOnline);

  const action = snackbarId => (
    <>
      <IconButton
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        <CloseIcon htmlColor='#fff' />
      </IconButton>
    </>
  );

  /* Plantilla para mostrar mensajes */
  const showMsgAlert = (
    msg,
    variant,
    persist = false,
    preventDuplicate = false
  ) => {
    enqueueSnackbar(msg, {
      variant,
      disableWindowBlurListener: true,
      action,
      autoHideDuration: 2000,
      persist: persist,
      preventDuplicate: preventDuplicate,
    });
  };

  /* Funcionalidades para manipular las columnas (Renderizado lado del usuario) */

  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

  /* Efecto que muestra/oculta columnas en función de Media Queries */
  useEffect(() => {
    handleResetColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQ1024, mediaQ560]);

  /* Función que oculta columnas */
  const handleColumnHide = (checked, column) => {
    let newColumn = {
      field: column.field,
      Header: column.Header,
      visible: checked,
    };

    let newVisibleColumns = visibleColumns.map(columnEl =>
      columnEl.field === newColumn.field ? newColumn : columnEl
    );

    setVisibleColumns(newVisibleColumns);
  };

  /* Función que reinicia la visibilidad de las columnas */
  const handleResetColumns = () => {
    setVisibleColumns(initialVisibleColumns);
  };

  const data = {
    db,
    error,
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

export { CrudProvider };
export default CrudContext;
