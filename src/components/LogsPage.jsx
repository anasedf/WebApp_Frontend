import { useEffect, useState } from 'react';
import { API_BASE, DRONE_ID } from '../config';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/logs/${DRONE_ID}`)
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load logs", err);
        setError("Failed to load drone logs");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="card-container">
      <div className="status-indicator">Loading log data...</div>
    </div>
  );

  if (error) return (
    <div className="card-container">
      <div className="status-indicator" style={{color: '#f85149'}}>{error}</div>
    </div>
  );

  return (
    <div className="card-container">
      <div className="card-header">
        <span className="icon">📋</span>
        <h2>Drone Temperature Logs</h2>
      </div>
      
      {logs.length === 0 ? (
        <div className="status-indicator">No logs available for this drone.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Country</th>
                <th>Drone ID</th>
                <th>Drone Name</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={idx}>
                  <td>{log.created}</td>
                  <td>{log.country}</td>
                  <td>{log.drone_id}</td>
                  <td>{log.drone_name}</td>
                  <td>
                    <span 
                      style={{
                        color: parseFloat(log.celsius) > 30 ? '#f85149' : '#4caf50'
                      }}
                    >
                      {log.celsius}°C
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="last-updated">
        {logs.length > 0 ? `Total records: ${logs.length}` : ''}
      </div>
    </div>
  );
}