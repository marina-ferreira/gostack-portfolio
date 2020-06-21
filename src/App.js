import React, { useState, useEffect } from "react"
import api from "services/api"

import "./styles.css"

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const repo = {
      title: `Repo ${Date.now()}`,
      url: `https://github.com/repo-${Date.now()}`,
      techs: ["js", "node"]
    }

    api.post('/repositories', repo)
      .then(response => setRepositories([...repositories, response.data]))
      .catch(error => console.log(error))
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(() => setRepositories(repositories.filter(repo => repo.id !== id)))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  )
}

export default App
