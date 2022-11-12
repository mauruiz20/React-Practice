import React, { useContext, useState } from "react";
import CrudContext from "../context/CrudContext";
import CrudModal from "./CrudModal";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

function Row({ data, setModal }) {
  const [open, setOpen] = useState(false);
  const {
    setModalData,
    setDataToEdit,
    updateData,
    mediaQ1024,
    mediaQ768,
    mediaQ560,
  } = useContext(CrudContext);

  const formattedDate = moment(data.date).format("D/MM/YYYY");

  const handleActive = (value) => {
    data.active = value;
    updateData(data);
  };

  const handleDelete = () => {
    setModalData(data);
    setModal(true);
  };

  return (
    <div className="mytable__body-row">
      <div className="mytable__body-cell">{data.surname}</div>
      <div className="mytable__body-cell">{data.name}</div>
      {mediaQ1024 && <div className="mytable__body-cell">{data.email}</div>}
      {mediaQ768 && <div className="mytable__body-cell">{data.phone}</div>}
      {mediaQ560 && (
        <div className="mytable__body-cell--center">
          {data.active ? (
            <Typography sx={{ color: "rgb(46, 125, 50)", fontWeight: "bold" }}>
              A
            </Typography>
          ) : (
            <Typography sx={{ color: "rgb(211, 47, 47)", fontWeight: "bold" }}>
              B
            </Typography>
          )}
        </div>
      )}
      <div className="mytable__body-cell--center mytable__actions">
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

        <Tooltip
          title="Borrar"
          arrow
          placement="top"
          disableInteractive
          enterDelay={2000}
          enterNextDelay={2000}
          leaveDelay={10}
          onClick={handleDelete}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
          {!mediaQ1024 && (
            <div className="mytable-collapse__item">
              <div className="mytable-collapse__title">Correo Electrónico</div>
              <div className="mytable-collapse__data">{data.email}</div>
            </div>
          )}
          {!mediaQ768 && (
            <div className="mytable-collapse__item">
              <div className="mytable-collapse__title">Teléfono</div>
              <div className="mytable-collapse__data">{data.phone}</div>
            </div>
          )}
          {!mediaQ560 && (
            <div className="mytable-collapse__item">
              <div className="mytable-collapse__title">Estado</div>
              <div className="mytable-collapse__data">
                {data.active ? (
                  <Typography
                    sx={{ color: "rgb(46, 125, 50)", fontWeight: "bold" }}
                  >
                    Dado de alta
                  </Typography>
                ) : (
                  <Typography
                    sx={{ color: "rgb(211, 47, 47)", fontWeight: "bold" }}
                  >
                    Dado de baja
                  </Typography>
                )}
              </div>
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

const CrudTable = () => {
  const {
    db,
    loading,
    rows,
    inactives,
    page,
    search,
    mediaQ1024,
    mediaQ768,
    mediaQ560,
  } = useContext(CrudContext);
  const [order, setOrder] = useState("surname asc");
  const [modal, setModal] = useState(false);
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
        index >= (page - 1) * rows && (
          <Row key={data.id} data={data} setModal={setModal} />
        )
    );
  };

  const orderStyles = {
    position: "absolute",
    transform: !mediaQ560 ? "translate(2.75rem)" : "translate(3.5rem)",
  };

  return (
    <div className="mytable">
      <CrudModal open={modal} setOpen={setModal} />
      {loading && (
        <CircularProgress
          sx={{ position: "absolute", top: "-11rem", left: "1rem" }}
        />
      )}

      <div className="mytable__head">
        <div className="mytable__head-row">
          <div className="mytable__head-cell">
            Apellidos
            <IconButton
              size="small"
              sx={orderStyles}
              onClick={() => {
                let alt = window.pageYOffset;
                order === "surname asc"
                  ? setOrder("surname desc")
                  : setOrder("surname asc");
                setTimeout(() => {
                  window.scrollTo({
                    top: alt,
                    behavior: "auto",
                  });
                }, 100);
              }}
              color={
                order === "surname asc" || order === "surname desc"
                  ? "primary"
                  : "default"
              }
              disableRipple={true}
            >
              {order === "surname desc" ? (
                <ArrowDownwardIcon fontSize="small" />
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </IconButton>
          </div>
          <div className="mytable__head-cell">
            Nombres
            <IconButton
              size="small"
              sx={orderStyles}
              onClick={() => {
                let alt = window.pageYOffset;
                order === "name asc"
                  ? setOrder("name desc")
                  : setOrder("name asc");
                setTimeout(() => {
                  window.scrollTo({
                    top: alt,
                    behavior: "auto",
                  });
                }, 100);
              }}
              color={
                order === "name asc" || order === "name desc"
                  ? "primary"
                  : "default"
              }
              disableRipple={true}
            >
              {order === "name desc" ? (
                <ArrowDownwardIcon fontSize="small" />
              ) : (
                <ArrowUpwardIcon fontSize="small" />
              )}
            </IconButton>
          </div>
          {mediaQ1024 && (
            <div className="mytable__head-cell">Correo Electrónico</div>
          )}
          {mediaQ768 && <div className="mytable__head-cell">Teléfono</div>}
          {mediaQ560 && (
            <div className="mytable__head-cell mytable__state">Estado</div>
          )}
          <div className="mytable__head-cell">Acciones</div>
        </div>
      </div>
      <div className="mytable__body">{data()}</div>
    </div>
  );
};

export default CrudTable;
