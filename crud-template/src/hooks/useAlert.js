import {useEffect, useState} from 'react';
import {useSnackbar} from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const useAlert = () => {
  /* Estados que muestran actualizaciones de la tabla */
  const [error, setError] = useState(false);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
  const showMsgAlert = (msg, variant, persist = false, preventDuplicate = false) => {
    enqueueSnackbar(msg, {
      variant,
      disableWindowBlurListener: true,
      action,
      autoHideDuration: 2000,
      persist: persist,
      preventDuplicate: preventDuplicate,
    });
  };

  return {showMsgAlert, setError};
};

export default useAlert;
