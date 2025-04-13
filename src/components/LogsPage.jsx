import { useEffect, useState } from 'react';
import { API_BASE, DRONE_ID } from '../config';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/logs/${DRONE_ID}`)
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div>
      <h2>Drone Logs</h2>
      <table className="table table-striped">
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
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.created}</td>
              <td>{log.country}</td>
              <td>{log.drone_id}</td>
              <td>{log.drone_name}</td>
              <td>{log.celsius}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
