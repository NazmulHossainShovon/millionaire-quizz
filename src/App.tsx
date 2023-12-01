import { useEffect, useMemo, useState } from "react";
import Start from "./pages/Start";
import { Route, Routes } from "react-router-dom";
import Quiz from "./pages/Quiz";
import Navbar from "./components/Navbar";

const backgroundStyle: React.CSSProperties = {
  backgroundColor: "#020230",
  color: "white",
  height: "100vh",
};

function App() {
  return (
    <div style={backgroundStyle}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/play" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
