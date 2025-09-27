import React, { useEffect, useState } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch projects:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Project name is required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, status }),
      });
      if (!res.ok) throw new Error('Failed to create project');
      const newProject = await res.json();
      setProjects([newProject, ...projects]);  // Add new project to the list
      setName('');
      setDescription('');
      setStatus('active');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>Project Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Add New Project</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <label>
            Name (required):<br />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        <div>
          <label>
            Description:<br />
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>

        <div>
          <label>
            Status:<br />
            <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
              <option value="active">Active</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Add Project
        </button>
      </form>

      <div className="projects">
        {projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <span className={`status ${project.status.replace(' ', '-')}`}>{project.status}</span>
              <p className="date">Created: {new Date(project.created_at).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;