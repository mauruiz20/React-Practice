import React, { useState } from "react";
import { Paper } from "@mui/material";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import CrudPagination from "./CrudPagination";
import CrudFormSearch from "./CrudFormSearch";

const Crud = () => {
  const [entries, setEntries] = useState(25);
  const [inactives, setInactives] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <>
      <Paper elevation={6} sx={{ width: "100%", borderRadius: "1rem", mb: 5 }}>
        <CrudForm />
      </Paper>
      <Paper elevation={6} sx={{ width: "100%", borderRadius: "1rem" }}>
        <CrudFormSearch
          inactives={inactives}
          setInactives={setInactives}
          search={search}
          setSearch={setSearch}
        />
        <CrudTable
          rows={entries}
          inactives={inactives}
          page={page}
          search={search}
        />
        <CrudPagination
          rows={entries}
          setRows={setEntries}
          page={page}
          setPage={setPage}
        />
      </Paper>
    </>
  );
};

export default Crud;
