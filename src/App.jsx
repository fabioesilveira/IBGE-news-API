import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SingleNews from "./pages/singleNews";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/singlenews/:code" element={<SingleNews />} />
    </Routes>

  )
}

export default App;