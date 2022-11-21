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
  const [rows, setRows] = useState(25);
  const [inactives, setInactives] = useState(true);
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
    { field: 'surname', Header: 'Apellidos', visible: true },
    { field: 'name', Header: 'Nombres', visible: true },
    { field: 'email', Header: 'Correo Electrónico', visible: mediaQ1024 },
    { field: 'phone', Header: 'Teléfono', visible: true },
    { field: 'state', Header: 'Estado', visible: mediaQ560 },
    { field: 'date', Header: 'Fecha de Nacimiento', visible: false },
    { field: 'address', Header: 'Dirección', visible: false },
    { field: 'nacionality', Header: 'Nacionalidad', visible: false },
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

  let url = 'http://localhost:5000/clientes';

  /* Initial API GET request */
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(response => {
        setDb(response.data);
        setError(null);
      })
      .catch(error => {
        setDb(null);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [url]);

  /* API POST request */
  const createData = data => {
    data.state = 'A';
    axios
      .post(url, data)
      .then(response => {
        setDb([...db, response.data]);
        showMsgAlert('Entrada agregada con éxito', 'success');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  /* API PUT request */
  const updateData = data => {
    let endpoint = `${url}/${data.id}`;

    axios
      .put(endpoint, data)
      .then(() => {
        let newData = db.map(el => (el.id === data.id ? data : el));
        setDb(newData);
        showMsgAlert('Entrada modificada con éxito', 'success');
      })
      .catch(error => {
        setError(error.message);
      });
  };

  /* API DELETE request */
  const deleteData = id => {
    let endpoint = `${url}/${id}`;

    axios
      .delete(endpoint)
      .then(() => {
        let newData = db.filter(el => el.id !== id);
        setDb(newData);
        setModalData({});
        showMsgAlert('Entrada borrada con éxito', 'warning');
      })
      .catch(error => {
        setError(error.message);
      });
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
    rows,
    visibleColumns,
    setVisibleColumns,
    setRows,
    inactives,
    setInactives,
    page,
    setPage,
    modalData,
    setModalData,
    createData,
    updateData,
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
