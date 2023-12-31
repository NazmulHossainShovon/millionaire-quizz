import { Alert, Button, Snackbar, SnackbarOrigin } from "@mui/material";
import React, { useContext, useRef } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

const startStyle: React.CSSProperties = {
  width: "250px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  position: "relative",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
};

const startInput: React.CSSProperties = {
  width: "100%",
  height: "30px",
  border: "none",
  borderRadius: "5px",
  textAlign: "center",
  fontSize: "18px",
};

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Start() {
  const inputRef = useRef<HTMLInputElement>();
  const { setUserName } = useContext(MyContext);
  const navigate = useNavigate();
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleSnackClick = (newState: SnackbarOrigin) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleClick = () => {
    inputRef.current.value && setUserName(inputRef.current.value);
    if (inputRef.current.value !== "") {
      navigate("/play");
    } else {
      handleSnackClick({ vertical: "top", horizontal: "center" });
    }
  };

  return (
    <div style={startStyle}>
      <input style={startInput} placeholder="enter your name" ref={inputRef} />
      <Button variant="outlined" color="error" onClick={handleClick}>
        Start
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="error">Please enter a valid name!</Alert>
      </Snackbar>
    </div>
  );
}
