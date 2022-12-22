import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import StyleContext from '../context/StyleContext';

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  /* Table updates states */
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [numRows, setNumRows] = useState(0);
  const [rowCount, setRowCount] = useState(25);
  const [cadena, setCadena] = useState('');
  const [incluyeBajas, setIncluyeBajas] = useState(true);
  const [page, setPage] = useState(1);

  const [openForm, setOpenForm] = useState(false);

  /* Messages updates states */
  const [modalData, setModalData] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /* HTTP Request states */
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { mediaQ1024, mediaQ560 } = useContext(StyleContext);

  const initialVisibleColumns = [
    { field: 'apellidos', Header: 'Apellidos', visible: true },
    { field: 'nombres', Header: 'Nombres', visible: true },
    { field: 'email', Header: 'Correo Electrónico', visible: mediaQ1024 },
    { field: 'telefono', Header: 'Teléfono', visible: true },
    { field: 'estadoCliente', Header: 'Estado', visible: mediaQ560 },
    { field: 'nacimiento', Header: 'Fecha de Nacimiento', visible: false },
    { field: 'direccion', Header: 'Dirección', visible: false },
    { field: 'nacionalidad', Header: 'Nacionalidad', visible: false },
  ];

  useEffect(() => {
    let errId;
    if (error) {
      errId = showMsgAlert(error, 'error', true, true);
    } else {
      closeSnackbar(errId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, closeSnackbar]);

  let url = 'http://localhost:8080/clientes';

  /* Initial API GET request */
  const getData = (offSet = '0', rowCount = '1000') => {
    let endpoint = `${url}?cadena=${cadena}&incluyeBajas=${
      incluyeBajas ? 'S' : 'N'
    }&offSet=${offSet}&rowCount=${rowCount}`;

    setLoading(true);
    axios
      .get(endpoint)
      .then(response => {
        setDb(response.data);
        setError(null);
      })
      .catch(error => {
        setDb(null);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cadena, incluyeBajas]);

  /* API POST request */
  const createData = data => {
    data.idCliente = undefined;

    setLoading(true);
    axios
      .post(url, data)
      .then(response => {
        getData();
        showMsgAlert(
          response.data,
          response.data.includes('Cliente') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  /* API PUT request */
  const updateData = data => {
    let endpoint = `${url}/${data.idCliente}`;

    setLoading(true);
    axios
      .put(endpoint, data)
      .then(response => {
        let newData = db.map(el =>
          el.idCliente === data.idCliente ? data : el
        );
        setDb(newData);
        showMsgAlert(
          response.data,
          response.data.includes('Cliente') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  /* API Patch request */
  const handleStateData = data => {
    let endpoint = `${url}/${data.idCliente}/alta`;
    if (data.estadoCliente === 'A') {
      endpoint = `${url}/${data.idCliente}/baja`;
    }

    setLoading(true);
    axios
      .patch(endpoint)
      .then(response => {
        data.estadoCliente = data.estadoCliente === 'A' ? 'B' : 'A';
        let newData = db.map(el =>
          el.idCliente === data.idCliente ? data : el
        );
        setDb(newData);
        showMsgAlert(
          response.data,
          response.data.includes('Cliente') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  /* API DELETE request */
  const deleteData = idCliente => {
    let endpoint = `${url}/${idCliente}`;

    setLoading(true);
    axios
      .delete(endpoint)
      .then(response => {
        let newData = db.filter(el => el.idCliente !== idCliente);
        setDb(newData);
        setModalData({});
        showMsgAlert(
          response.data,
          response.data.includes('Cliente') ? 'success' : 'warning'
        );
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  /* Snackbar functions */

  let offlineId;

  const handleOnline = () => {
    closeSnackbar(offlineId);
    enqueueSnackbar('Conexión recuperada!', {
      variant: 'success',
      preventDuplicate: true,
    });
  };

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

  /* Visible columns functions */

  const [visibleColumns, setVisibleColumns] = useState(initialVisibleColumns);

  useEffect(() => {
    handleResetColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQ1024, mediaQ560]);

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
