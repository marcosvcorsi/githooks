import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('https://api.github.com/users/marcosvcorsi/repos');
      const data = await response.json();

      setRepositories(data);
    }

    loadData();
  }, []);

  useEffect(() => {
    const favorites = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${favorites.length} favoritos`;
  }, [repositories]);

  function handleAddRepository() {
    setRepositories([...repositories, { id: Math.random(), name: 'novo-repo' }])
  }

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>favoritar</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>
        Adicionar repositorio
      </button>
    </>
  )
}
