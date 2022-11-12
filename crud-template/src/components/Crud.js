import React, { useContext } from "react";
import { Paper } from "@mui/material";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import CrudPagination from "./CrudPagination";
import CrudFormSearch from "./CrudFormSearch";
import CrudContext from "../context/CrudContext";

const Crud = () => {
  const { db, mediaQ768 } = useContext(CrudContext);
  return (
    <>
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          borderRadius: mediaQ768 ? "1rem" : "0.5rem",
          mb: mediaQ768 ? 5 : 1,
        }}
      >
        <CrudForm />
      </Paper>
      {db && (
        <Paper elevation={6} sx={{ width: "100%", borderRadius: "1rem" }}>
          <CrudFormSearch />
          <CrudTable />
          <CrudPagination />
        </Paper>
      )}
    </>
  );
};

export default Crud;
