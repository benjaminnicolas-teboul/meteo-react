import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CitySearch from './components/CitySearch';
import Home from './components/pages/Home';
import Meteo from './components/pages/Meteo';


function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-5 p-2 bg-gray-100 mb-4">
        <Link to="/">Accueil</Link>
        <Link to="/meteo">Recherche météo</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meteo" element={<Meteo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;