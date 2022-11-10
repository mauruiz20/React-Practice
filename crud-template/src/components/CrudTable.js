import { Collapse, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import datos from "../api/db.json";
import React, { useState } from "react";

function Row({ data }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(data.active);

  return (
    <div className="mytable-row">
      <div className="mytable-cell">{data.surname}</div>
      <div className="mytable-cell">{data.name}</div>
      <div className="mytable-cell">{data.email}</div>
      <div className="mytable-cell">{data.phone}</div>
      <div className="mytable-cell">
        {active ? (
          <Typography sx={{ color: "rgb(46, 125, 50)" }}>A</Typography>
        ) : (
          <Typography sx={{ color: "rgb(211, 47, 47)" }}>B</Typography>
        )}
      </div>
      <div className="mytable-cell">
        <Tooltip
          title="Expandir"
          arrow
          placement="top"
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
        >
          <IconButton color="primary" onClick={() => setOpen(!open)}>
            <VisibilityIcon />
          </IconButton>
        </Tooltip>

        <Tooltip
          title="Editar"
          arrow
          placement="top"
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
        >
          <IconButton sx={{ color: "#444" }}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        {!active && (
          <Tooltip
            title="Dar de Alta"
            arrow
            placement="top"
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <IconButton color="success" onClick={() => setActive(!active)}>
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
        )}

        {active && (
          <Tooltip
            title="Dar de Baja"
            arrow
            placement="top"
            disableInteractive
            enterDelay={2000}
            enterNextDelay={2000}
            leaveDelay={10}
          >
            <IconButton color="error" onClick={() => setActive(!active)}>
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip
          title="Borrar"
          arrow
          placement="top"
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit className="collapse">
        <div className="mytable-head-collapse">
          <div className="mytable-row-collapse">
            <div className="mytable-cell-collapse">Nacimiento</div>
            <div className="mytable-cell-collapse">Dirección</div>
            <div className="mytable-cell-collapse">Nacionalidad</div>
          </div>
        </div>
        <div className="mytable-body-collapse">
          <div className="mytable-row-collapse">
            <div className="mytable-cell-collapse">{data.date}</div>
            <div className="mytable-cell-collapse">{data.address}</div>
            <div className="mytable-cell-collapse">{data.nacionality}</div>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

const CrudTable = ({ rows, inactives }) => {
  const [order, setOrder] = useState("surname asc");

  const data = () => {
    let array = {};

    switch (order) {
      case "surname asc":
        array = datos.clientes.sort((a, b) => (a.surname > b.surname ? 1 : -1));
        break;

      case "surname desc":
        array = datos.clientes.sort((a, b) => (a.surname < b.surname ? 1 : -1));
        break;

      case "name asc":
        array = datos.clientes.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;

      case "name desc":
        array = datos.clientes.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;

      default:
        break;
    }

    if (!inactives) {
      array = array.filter((data) => data.active === true);
    }

    return array.map(
      (data, index) => index < rows && <Row key={data.id} data={data} />
    );
  };

  return (
    <div className="mytable">
      <div className="mytable-head">
        <div className="mytable-row">
          <div className="mytable-cell">
            Apellidos
            {order === "surname asc" ? (
              <IconButton
                size="small"
                sx={{ position: "absolute", left: "70%" }}
                onClick={() => setOrder("surname desc")}
                color="primary"
              >
                <ArrowUpwardIcon />
              </IconButton>
            ) : order === "surname desc" ? (
              <IconButton
                size="small"
                sx={{ position: "absolute", left: "70%" }}
                onClick={() => setOrder("surname asc")}
                color="primary"
              >
                <ArrowDownwardIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                sx={{ position: "absolute", left: "70%" }}
                onClick={() => setOrder("surname asc")}
              >
                <ArrowUpwardIcon />
              </IconButton>
            )}
          </div>
          <div className="mytable-cell">
            Nombres
            {order === "name asc" ? (
              <IconButton
                size="small"
                sx={{ position: "absolute", left: "70%" }}
                onClick={() => setOrder("name desc")}
                color="primary"
              >
                <ArrowUpwardIcon />
              </IconButton>
            ) : order === "name desc" ? (
              <IconButton
                size="small"
                sx={{ position: "absolute", left: "70%" }}
                onClick={() => setOrder("name asc")}
                color="primary"
              >
                <ArrowDownwardIcon />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                sx={{ position: "absolute", left: "70%" }}
                onClick={() => setOrder("name asc")}
              >
                <ArrowUpwardIcon />
              </IconButton>
            )}
          </div>
          <div className="mytable-cell">Correo Electrónico</div>
          <div className="mytable-cell">Teléfono</div>
          <div className="mytable-cell">Estado</div>
          <div className="mytable-cell">Acciones</div>
        </div>
      </div>
      <div className="mytable-body">{data()}</div>
    </div>
  );
};

export default CrudTable;
