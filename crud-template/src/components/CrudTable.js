import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";

function createData(surname, name, email, phone, isAdmin) {
  return {
    surname,
    name,
    email,
    phone,
    isAdmin,
    date: "2020-01-05",
    address: "Buenos Aires 532",
    nacionality: "Argentino",
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }} hover>
        <TableCell>{row.surname}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell sx={{ width: "15rem" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Button variant="contained" color="success">
            Editar
          </Button>
          <Button variant="contained" color="error">
            Borrar
          </Button>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nacimiento</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Nacionalidad</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.nacionality}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData(
    "Byers",
    "Stacy",
    "stacy_byers2710@yahoo.com",
    "3865170216",
    "true"
  ),
  createData(
    "Oneal",
    "Ronan",
    "o.ronan2694@hotmail.com",
    "3863585119",
    "false"
  ),
  createData("Glass", "Olga", "o-glass@yahoo.com", "3863705547", "false"),
  createData(
    "Reese",
    "Felicia",
    "f.reese2755@hotmail.com",
    "3863027153",
    "true"
  ),
  createData("Shaffer", "Ezra", "s.ezra@yahoo.com", "3863342282", "true"),
  createData("Suarez", "Oleg", "s_oleg@google.com", "3865815268", "true"),
  createData(
    "Harvey",
    "Harper",
    "harveyharper7424@outlook.com",
    "3865685648",
    "true"
  ),
  createData(
    "Gilmore",
    "Jaden",
    "gilmorejaden@yahoo.com",
    "3863321375",
    "true"
  ),
  createData(
    "Becker",
    "Callum",
    "callum-becker887@hotmail.com",
    "3865764879",
    "true"
  ),
  createData(
    "Solis",
    "Melissa",
    "s.melissa@hotmail.com",
    "3863802465",
    "false"
  ),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Apellidos</TableCell>
            <TableCell>Nombres</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
