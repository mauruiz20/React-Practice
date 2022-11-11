import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton, Tooltip } from "@mui/material";

export default function CrudModal({ surname, name }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip
        title="Borrar"
        arrow
        placement="top"
        disableInteractive
        enterDelay={2000}
        enterNextDelay={2000}
        leaveDelay={10}
        onClick={handleOpen}
      >
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
              {surname} {name}
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
              onClick={handleClose}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
