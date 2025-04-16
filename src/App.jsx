import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConfigPage from './components/ConfigPage';
import SubmitPage from './components/SubmitPage';
import LogsPage from './components/LogsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [droneConfig, setDroneConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const DRONE_ID = import.meta.env.VITE_DRONE_ID || '3001'; // Default to 3001 if not specified
  
  useEffect(() => {
    // Fetch drone configuration when the app loads
    const fetchConfig = async () => {
      try {
        const response = await fetch(`https://webapp-backend-ejxa.onrender.com/configs/${DRONE_ID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch config');
        }
        const data = await response.json();
        setDroneConfig(data);
      } catch (error) {
        console.error('Error fetching config:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConfig();
  }, [DRONE_ID]);

  return (
    <Router>
      <div className="app-container">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">Drone Dashboard</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">View Config</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/submit">Temperature Log</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/logs">View Logs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="container mt-5">
          <div className="glassmorphism-bg position-fixed top-0 start-0 w-100 h-100 z-n1">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
          
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading drone configuration...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<ConfigPage droneConfig={droneConfig} />} />
              <Route path="/submit" element={<SubmitPage droneConfig={droneConfig} />} />
              <Route path="/logs" element={<LogsPage droneId={DRONE_ID} />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;