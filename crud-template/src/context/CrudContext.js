import { IconButton, useMediaQuery } from "@mui/material";
import { useSnackbar } from "notistack";
import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CloseIcon from "@mui/icons-material/Close";

const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  /* Table updates states */
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rows, setRows] = useState(25);
  const [inactives, setInactives] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ search: "" });

  /* Messages updates states */
  const [modalData, setModalData] = useState({});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  /* HTTP Request states */
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Media Querys states */
  const mediaQ1024 = useMediaQuery("(min-width: 1025px)");
  const mediaQ768 = useMediaQuery("(min-width: 769px)");
  const mediaQ560 = useMediaQuery("(min-width: 561px)");

  let api = helpHttp();
  let url = "http://localhost:5000/clientes";

  /* Initial API GET request */
  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);

  /* API POST request */
  const createData = (data) => {
    data.id = Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };
    api.post(url, options).then((res) => {
      if (!res.err) {
        setDb([...db, res]);
        showMsgAlert("Entrada agregada con éxito", "success");
      } else {
        setError(res);
      }
    });
  };

  /* API PUT request */
  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
        showMsgAlert("Entrada modificada con éxito", "success");
      } else {
        setError(res);
      }
    });
  };

  /* API DELETE request */
  const deleteData = (id) => {
    let endpoint = `${url}/${id}`;
    let options = {
      headers: { "content-type": "application/json" },
    };
    api.del(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.filter((el) => el.id !== id);
        setDb(newData);
        setModalData({});
        showMsgAlert("Entrada borrada con éxito", "warning");
      } else {
        setError(res);
      }
    });
  };

  /* Snackbar functions */

  let offlineId;

  const handleOnline = () => {
    closeSnackbar(offlineId);
    enqueueSnackbar("Conexión recuperada!", {
      variant: "success",
      preventDuplicate: true,
    });
  };

  const handleOffline = () =>
    (offlineId = enqueueSnackbar("Sin conexión!", {
      variant: "error",
      persist: "true",
      preventDuplicate: true,
    }));

  window.addEventListener("offline", handleOffline);

  window.addEventListener("online", handleOnline);

  const action = (snackbarId) => (
    <>
      <IconButton
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        <CloseIcon htmlColor="#fff" />
      </IconButton>
    </>
  );

  const showMsgAlert = (msg, variant) => {
    enqueueSnackbar(msg, {
      variant,
      disableWindowBlurListener: true,
      action,
      autoHideDuration: 2000,
    });
  };

  const data = {
    db,
    error,
    loading,
    dataToEdit,
    setDataToEdit,
    rows,
    setRows,
    inactives,
    setInactives,
    page,
    setPage,
    search,
    setSearch,
    modalData,
    setModalData,
    mediaQ1024,
    mediaQ768,
    mediaQ560,
    createData,
    updateData,
    deleteData,
  };

  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;
