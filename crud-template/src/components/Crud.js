import React from "react";
import { Container, Paper } from "@mui/material";
import CrudForm from "./CrudForm";
import CrudTable2 from "./CrudTable2";

const Crud = () => {
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
        <CrudTable2 />
      </Paper>
    </Container>
  );
};

export default Crud;
