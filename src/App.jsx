import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ConfigPage from './components/ConfigPage';
import SubmitPage from './components/SubmitPage';
import LogsPage from './components/LogsPage';

export default function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Drone Dashboard</h1>
        <nav className="my-3">
          <Link className="btn btn-outline-primary me-2" to="/">View Config</Link>
          <Link className="btn btn-outline-success me-2" to="/submit">Submit Temp</Link>
          <Link className="btn btn-outline-secondary" to="/logs">View Logs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ConfigPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
