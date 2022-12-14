import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  /* Table updates states */
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [showInactives, setShowInactives] = useState(true);
  const [page, setPage] = useState(1);

  /* Messages updates states */
  const [modalData, setModalData] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /* HTTP Request states */
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let errId;
    if (error) {
      errId = showMsgAlert(error, 'error', true, true);
    } else {
      closeSnackbar(errId);
    }
  }, [error, closeSnackbar]);

  let url = 'http://localhost:5000/clientes';

  /* Initial API GET request */
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(response => {
        setDb(response.data.filter(el => el.state !== 'B' || showInactives));
        setError(null);
      })
      .catch(error => {
        setDb(null);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [url, showInactives]);

  /* API POST request */
  const createData = data => {
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

  const data = {
    db,
    error,
    loading,
    dataToEdit,
    setDataToEdit,
    dataToDelete,
    setDataToDelete,
    showInactives,
    setShowInactives,
    page,
    setPage,
    modalData,
    setModalData,
    createData,
    updateData,
    deleteData,
  };

  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;
