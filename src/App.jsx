import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import ConfigPage from './components/ConfigPage';
import SubmitPage from './components/SubmitPage';
import LogsPage from './components/LogsPage';
import './DroneStyles.css';

export default function App() {
  return (
    <Router>
      <div className="drone-dashboard">
        <header className="drone-header">
          <h1 className="drone-title">Drone Management</h1>
          <nav className="drone-nav">
            <NavLink 
              className={({isActive}) => isActive ? "drone-nav-link active" : "drone-nav-link"} 
              to="/"
            >
              View Config
            </NavLink>
            <NavLink 
              className={({isActive}) => isActive ? "drone-nav-link active" : "drone-nav-link"} 
              to="/submit"
            >
              Temperature Log
            </NavLink>
            <NavLink 
              className={({isActive}) => isActive ? "drone-nav-link active" : "drone-nav-link"} 
              to="/logs"
            >
              View Logs
            </NavLink>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </div>
    </Router>
  );
}