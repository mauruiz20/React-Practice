import {
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import datos from "../api/db.json";
import React, { useState } from "react";
import CrudModal from "./CrudModal";

function Row({ data }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(data.active);
  const matches1024 = useMediaQuery("(min-width: 1025px)");
  const matches768 = useMediaQuery("(min-width: 769px)");

  return (
    <div className="mytable__body-row">
      <div className="mytable__body-cell">{data.surname}</div>
      <div className="mytable__body-cell">{data.name}</div>
      {matches1024 && <div className="mytable__body-cell">{data.email}</div>}
      {matches768 && <div className="mytable__body-cell">{data.phone}</div>}
      <div className="mytable__body-cell">
        {active ? (
          <Typography sx={{ color: "rgb(46, 125, 50)" }}>A</Typography>
        ) : (
          <Typography sx={{ color: "rgb(211, 47, 47)" }}>B</Typography>
        )}
      </div>
      <div className="mytable__body-cell mytable__actions">
        <Tooltip
          title="Expandir"
          arrow
          placement="top"
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
          size="small"
        >
          <IconButton color="primary" onClick={() => setOpen(!open)}>
            {open ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
          size="small"
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
            size="small"
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
            size="small"
          >
            <IconButton color="error" onClick={() => setActive(!active)}>
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>
        )}

        <CrudModal surname={data.surname} name={data.name} />
      </div>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className="mytable-collapse"
      >
        <div className="mytable-collapse__container">
          <div className="mytable-collapse__item">
            <div className="mytable-collapse__title">Nacimiento</div>
            <div className="mytable-collapse__data">{data.date}</div>
          </div>
          <div className="mytable-collapse__item">
            <div className="mytable-collapse__title">Dirección</div>
            <div className="mytable-collapse__data">{data.address}</div>
          </div>
          <div className="mytable-collapse__item">
            <div className="mytable-collapse__title">Nacionalidad</div>
            <div className="mytable-collapse__data">{data.nacionality}</div>
          </div>
          {!matches1024 && (
            <div className="mytable-collapse__item">
              <div className="mytable-collapse__title">Correo Electrónico</div>
              <div className="mytable-collapse__data">{data.email}</div>
            </div>
          )}
          {!matches768 && (
            <div className="mytable-collapse__item">
              <div className="mytable-collapse__title">Teléfono</div>
              <div className="mytable-collapse__data">{data.phone}</div>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

const CrudTable = ({ rows, inactives, page, search }) => {
  const [order, setOrder] = useState("surname asc");
  const matches1024 = useMediaQuery("(min-width: 1025px)");
  const matches768 = useMediaQuery("(min-width: 769px)");

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

    // if (search !== "" && search.length > 3) {
    //   array = array.filter((data) => data.name.includes(search));
    // }

    return array.map(
      (data, index) =>
        index < rows * page &&
        index >= (page - 1) * rows && <Row key={data.id} data={data} />
    );
  };

  return (
    <div className="mytable">
      <div className="mytable__head">
        <div className="mytable__head-row">
          <div className="mytable__head-cell">
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
          <div className="mytable__head-cell">
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
          {matches1024 && (
            <div className="mytable__head-cell">Correo Electrónico</div>
          )}
          {matches768 && <div className="mytable__head-cell">Teléfono</div>}
          <div className="mytable__head-cell">Estado</div>
          <div className="mytable__head-cell">Acciones</div>
        </div>
      </div>
      <div className="mytable__body">{data()}</div>
    </div>
  );
};

export default CrudTable;
