import React, { useContext } from "react";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import CrudContext from "../context/CrudContext";

const CrudModal = ({ open, setOpen }) => {
  const { modalData: data, deleteData } = useContext(CrudContext);

  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    setOpen(false);
    deleteData(data.id);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="crud-modal">
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            textAlign="center"
          >
            Confirmación de borrado
          </Typography>
          <hr className="crud-modal__hr" />
          <Typography id="modal-modal-description" sx={{ textAlign: "center" }}>
            ¿Estás seguro que quieres borrar al usuario{" "}
            <b>
              {data.surname} {data.name}
            </b>
            ?
          </Typography>
          <hr className="crud-modal__hr" />
          <div className="crud-modal__btn-container">
            <Button
              className="crud-modal__btn"
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              className="crud-modal__btn"
              variant="contained"
              color="primary"
              onClick={handleDelete}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CrudModal;
