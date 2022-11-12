import { createContext, useState } from "react";
import initialDb from "../api/db.json";
const CrudContext = createContext();

const CrudProvider = ({ children }) => {
  const [db, setDb] = useState(initialDb.clientes);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [rows, setRows] = useState(25);
  const [inactives, setInactives] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ search: "" });
  const [msgAlert, setMsgAlert] = useState(false);

  const createData = (data) => {
    data.id = Date.now();
    setDb([...db, data]);
    setMsgAlert(true);
    setTimeout(() => {
      setMsgAlert(false);
    }, 5000);
  };

  const updateData = (data) => {
    let newData = db.map((el) => (el.id === data.id ? data : el));
    setDb(newData);
  };

  const deleteData = (data) => {
    let newData = db.filter((el) => el.id !== data.id);
    setDb(newData);
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
    createData,
    updateData,
    deleteData,
  };

  return <CrudContext.Provider value={data}>{children}</CrudContext.Provider>;
};

export { CrudProvider };
export default CrudContext;
