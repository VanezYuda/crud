import { Routes, Route, Link } from "react-router-dom";
import FruitPage from "./pages/FruitPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FruitPage />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
