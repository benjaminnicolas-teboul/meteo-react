import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Meteo from "./components/pages/Meteo";
import NotFound from "./components/pages/NotFound";

function App() {
  return (
    <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <BrowserRouter basename="/meteo-react">
        <nav className="flex flex-wrap gap-4 p-2 bg-gray-100 mb-4 justify-center w-full">
          <Link to="/">Home</Link>
          <Link to="/meteo">Look for forecast in any location</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meteo" element={<Meteo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
