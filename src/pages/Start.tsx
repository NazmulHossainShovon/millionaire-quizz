import { Button } from "@mui/material";
import { useRef } from "react";

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

export default function Start({ setUsername }) {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div style={startStyle}>
      <input style={startInput} placeholder="enter your name" ref={inputRef} />
      <Button variant="outlined" color="error" onClick={handleClick}>
        Start
      </Button>
    </div>
  );
}
