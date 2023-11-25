import { useEffect, useMemo, useState } from "react";
import Start from "./pages/Start";
import { Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";
import { Button } from "@mui/material";

const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#020230",
  color: "white",
  height: "100vh",
};

function App() {
  return (
    <div style={backgroundStyle}>
      <Button variant="contained">Home</Button>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/play" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
