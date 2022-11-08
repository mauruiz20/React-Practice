import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CrudTableRow from "./CrudTableRow";

const CrudTable = ({ data, setDataToEdit, deleteData }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Apellidos</TableCell>
            <TableCell align="center">Nombres</TableCell>
            <TableCell align="center">Teléfono</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.surname}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.phone}</TableCell>
              <TableCell align="center">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// const CrudTable = ({ data, setDataToEdit, deleteData }) => {
//   return (
//     <div>
//       <h3>Tabla de Datos</h3>
//       <table>
//         <thead>
//           <tr>
//             <th>Apellido</th>
//             <th>Nombre</th>
//             <th>Teléfono</th>
//             <th>Acciones</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((el) => (
//               <CrudTableRow
//                 key={el.id}
//                 el={el}
//                 setDataToEdit={setDataToEdit}
//                 deleteData={deleteData}
//               />
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">Sin datos</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default CrudTable;
