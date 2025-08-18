import React, { useState } from "react";

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
      <label htmlFor="city-input" className="sr-only">
        Enter city name
      </label>
      <input
        id="city-input"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter a city"
        className="border border-gray-300 rounded px-3 py-2 flex-grow"
      />
      <button
        type="submit"
        disabled={city.trim() === ''}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Rechercher
      </button>
    </form>
  );
};

export default CitySearch;
