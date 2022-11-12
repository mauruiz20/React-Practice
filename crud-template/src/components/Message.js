import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import CrudContext from "../context/CrudContext";

const Message = ({ msg, type }) => {
  const { msgAlert, setMsgAlert } = useContext(CrudContext);

  return (
    <Box
      sx={{
        width: "30%",
        minWidth: "18rem",
        margin: "auto",
        position: "absolute",
        top: 0,
        right: "50%",
        transform: "translate(50%)",
      }}
    >
      <Collapse in={msgAlert}>
        <Alert
          severity={type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setMsgAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {msg}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Message;
