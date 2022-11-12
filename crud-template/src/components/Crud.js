import React from "react";
import { Paper } from "@mui/material";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import CrudPagination from "./CrudPagination";
import CrudFormSearch from "./CrudFormSearch";
import { CrudProvider } from "../context/CrudContext";

const Crud = () => {
  return (
    <>
      <CrudProvider>
        <Paper
          elevation={6}
          sx={{ width: "100%", borderRadius: "1rem", mb: 5 }}
        >
          <CrudForm />
        </Paper>
        <Paper elevation={6} sx={{ width: "100%", borderRadius: "1rem" }}>
          <CrudFormSearch />
          <CrudTable />
          <CrudPagination />
        </Paper>
      </CrudProvider>
    </>
  );
};

export default Crud;
