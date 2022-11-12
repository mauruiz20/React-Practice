import React, { useContext, useState } from "react";
import CrudContext from "../context/CrudContext";
import CrudModal from "./CrudModal";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import {
  Collapse,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Message from "./Message";

function Row({ data }) {
  const [open, setOpen] = useState(false);
  const { setDataToEdit, updateData } = useContext(CrudContext);
  const matches1024 = useMediaQuery("(min-width: 1025px)");
  const matches768 = useMediaQuery("(min-width: 769px)");

  const formattedDate = moment(data.date).format("D/MM/YYYY");

  const handleActive = (value) => {
    data.active = value;
    updateData(data);
  };

  return (
    <div className="mytable__body-row">
      <div className="mytable__body-cell">{data.surname}</div>
      <div className="mytable__body-cell">{data.name}</div>
      {matches1024 && <div className="mytable__body-cell">{data.email}</div>}
      {matches768 && <div className="mytable__body-cell">{data.phone}</div>}
      <div className="mytable__body-cell">
        {data.active ? (
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
          <IconButton
            sx={{ color: "#444" }}
            onClick={() => setDataToEdit(data)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>

        {!data.active && (
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
            <IconButton color="success" onClick={() => handleActive(true)}>
              <ArrowUpwardIcon />
            </IconButton>
          </Tooltip>
        )}

        {data.active && (
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
            <IconButton color="error" onClick={() => handleActive(false)}>
              <ArrowDownwardIcon />
            </IconButton>
          </Tooltip>
        )}

        <CrudModal data={data} />
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
            <div className="mytable-collapse__data">{formattedDate}</div>
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

const CrudTable = () => {
  const { db, rows, inactives, page, search } = useContext(CrudContext);
  const [order, setOrder] = useState("surname asc");
  const matches1024 = useMediaQuery("(min-width: 1025px)");
  const matches768 = useMediaQuery("(min-width: 769px)");
  let str = search.search;

  const data = () => {
    let array = {};

    switch (order) {
      case "surname asc":
        array = db.sort((a, b) => (a.surname > b.surname ? 1 : -1));
        break;

      case "surname desc":
        array = db.sort((a, b) => (a.surname < b.surname ? 1 : -1));
        break;

      case "name asc":
        array = db.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;

      case "name desc":
        array = db.sort((a, b) => (a.name < b.name ? 1 : -1));
        break;

      default:
        break;
    }

    if (!inactives) {
      array = array.filter((data) => data.active === true);
    }

    if (str !== "") {
      str = search.search.toString().toLowerCase();
      array = array.filter((data) => data.name.toLowerCase().includes(str));
    }

    return array.map(
      (data, index) =>
        index < rows * page &&
        index >= (page - 1) * rows && <Row key={data.id} data={data} />
    );
  };

  const orderStyles = {
    position: "absolute",
    transform: "translate(3.5rem)",
  };

  return (
    <div className="mytable">
      <Message msg={"Entrada agregada con éxito"} type="success" />
      <div className="mytable__head">
        <div className="mytable__head-row">
          <div className="mytable__head-cell">
            <div className="mytable__head-title">Apellidos</div>
            {order === "surname asc" ? (
              <IconButton
                sx={orderStyles}
                onClick={() => setOrder("surname desc")}
                color="primary"
                disableRipple={true}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
            ) : order === "surname desc" ? (
              <IconButton
                sx={orderStyles}
                onClick={() => setOrder("surname asc")}
                color="primary"
                disableRipple={true}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                sx={orderStyles}
                onClick={() => setOrder("surname asc")}
                disableRipple={true}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          <div className="mytable__head-cell">
            Nombres
            {order === "name asc" ? (
              <IconButton
                size="small"
                sx={orderStyles}
                onClick={() => setOrder("name desc")}
                color="primary"
                disableRipple={true}
              >
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
            ) : order === "name desc" ? (
              <IconButton
                size="small"
                sx={orderStyles}
                onClick={() => setOrder("name asc")}
                color="primary"
                disableRipple={true}
              >
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                sx={orderStyles}
                onClick={() => setOrder("name asc")}
                disableRipple={true}
              >
                <ArrowUpwardIcon fontSize="small" />
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
