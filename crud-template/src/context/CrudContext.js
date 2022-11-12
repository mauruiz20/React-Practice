import { useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";
import initialDb from "../api/db.json";
const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  const [db, setDb] = useState(initialDb.clientes);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rows, setRows] = useState(25);
  const [inactives, setInactives] = useState(true);
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState({});
  const [search, setSearch] = useState({ search: "" });
  const [msgAlert, setMsgAlert] = useState(false);
  const [msgData, setMsgData] = useState({});
  const mediaQ1024 = useMediaQuery("(min-width: 1025px)");
  const mediaQ768 = useMediaQuery("(min-width: 769px)");

  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
    setMsgData({ msg: "Entrada agregada con éxito", type: "success" });
    showMsgAlert();
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
    setMsgData({ msg: "Entrada modificada con éxito", type: "success" });
    showMsgAlert();
  };

  const deleteData = (data) => {
    let newData = db.filter((el) => el.id !== data.id);
    setDb(newData);
    setModalData({});
    setMsgData({ msg: "Entrada borrada con éxito", type: "warning" });
    showMsgAlert();
  };

  const showMsgAlert = () => {
    setMsgAlert(true);
    setTimeout(() => {
      setMsgAlert(false);
    }, 5000);
  };

  const data = {
    db,
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
    msgAlert,
    setMsgAlert,
    modalData,
    setModalData,
    msgData,
    mediaQ1024,
    mediaQ768,
    createData,
    updateData,
    deleteData,
  };

  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;
