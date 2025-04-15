import { useState, useEffect } from 'react';

function LogsPage({ droneId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://webapp-backend-ejxa.onrender.com/logs/${droneId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch logs');
        }
        
        const data = await response.json();
        setLogs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setError('Failed to load drone logs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [droneId]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  return (
    <div className="logs-page">
      <h1 className="mb-4">Temperature Logs</h1>
      <div className="logs-subtitle">
        <span>Showing latest 25 log entries</span>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : logs.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No logs found for this drone.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover log-table">
            <thead>
              <tr>
                <th>Created</th>
                <th>Country</th>
                <th>Drone ID</th>
                <th>Drone Name</th>
                <th>Celsius</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{formatDate(log.created)}</td>
                  <td>{log.country}</td>
                  <td>{log.drone_id}</td>
                  <td>{log.drone_name}</td>
                  <td>
                    <span className={log.celsius > 40 ? 'text-danger' : log.celsius < 10 ? 'text-info' : ''}>
                      {log.celsius}°C
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LogsPage;