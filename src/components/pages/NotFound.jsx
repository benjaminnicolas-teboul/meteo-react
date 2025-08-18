import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 dark:bg-gray-900 dark:text-gray-100 p-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl sm:text-2xl md:text-3xl mb-6">
        Oups ! La page que vous cherchez n'existe pas.
      </p>
      <p className="text-md sm:text-lg md:text-xl">
        Vérifiez l'URL ou retournez à la page d’accueil.
      </p>
    </div>
  );
}

export default NotFound;
