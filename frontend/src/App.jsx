import { useMemo } from 'react';
import { getClientId } from './utils/clientId';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const clientId = useMemo(() => getClientId(), []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>URL Shortener</h1>
          <p className="subtitle">Create short links and manage your URLs from the browser.</p>
        </div>
        <span className="client-id">Client ID: {clientId}</span>
      </header>

      <main>
        <Home />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
