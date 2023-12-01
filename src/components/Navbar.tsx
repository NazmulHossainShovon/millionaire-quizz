import { HomeOutlined } from "@mui/icons-material";
import { AppBar, Chip, IconButton, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { userName } = useContext(MyContext);
  const navigate = useNavigate();

  const homeClick = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={homeClick}>
          <HomeOutlined sx={{ color: "white" }} />
        </IconButton>
        <Chip color="error" label={userName} />
      </Toolbar>
    </AppBar>
  );
}
