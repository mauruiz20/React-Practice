import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import CrudForm from "./CrudForm";
import CrudTable2 from "./CrudTable2";
import CrudPagination from "./CrudPagination";
import CrudFormSearch from "./CrudFormSearch";

const Crud = () => {
  const [entries, setEntries] = useState(5);
  const [inactives, setInactives] = useState(true);

  return (
    <Container
      maxWidth="xll"
      sx={{
        width: "100%",
        padding: "2rem",
        backgroundColor: "#D6E4E5",
      }}
    >
      <Paper elevation={6} sx={{ width: "100%", borderRadius: "1rem" }}>
        <CrudForm />
        <hr />
        <CrudFormSearch inactives={inactives} setInactives={setInactives} />
        <CrudTable2 rows={entries} inactives={inactives} />
        <CrudPagination rows={entries} setRows={setEntries} />
      </Paper>
    </Container>
  );
};

export default Crud;
