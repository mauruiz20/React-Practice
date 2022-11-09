import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import { Box } from "@mui/system";

const CrudTable2 = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div class="mytable">
      <div class="mytable-head">
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">Acciones</div>
        </div>
      </div>
      <div class="mytable-body">
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary" onClick={() => setOpen(!open)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div class="mytable-row">
          <Collapse in={open} timeout="auto" unmountOnExit>
            hola
          </Collapse>
        </div>
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <div class="mytable-row">
          <div class="mytable-cell">Apellidos</div>
          <div class="mytable-cell">Nombres</div>
          <div class="mytable-cell">Correo Electrónico</div>
          <div class="mytable-cell">Teléfono</div>
          <div class="mytable-cell">
            <IconButton color="primary">
              <VisibilityIcon />
            </IconButton>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
            <IconButton color="success">
              <ArrowUpwardIcon />
            </IconButton>
            <IconButton color="error">
              <ArrowDownwardIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudTable2;
