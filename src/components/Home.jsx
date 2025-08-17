import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur la météo React !</h1>
      <Link to="/meteo" className="text-blue-600 underline">Aller à la recherche météo</Link>
    </div>
  );
}

export default Home;
