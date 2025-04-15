import { useEffect, useState } from 'react';
import { API_BASE, DRONE_ID } from '../config';

export default function SubmitPage() {
  const [config, setConfig] = useState(null);
  const [celsius, setCelsius] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetch(`${API_BASE}/configs/${DRONE_ID}`)
      .then(res => res.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load config", err);
        setLoading(false);
        setStatus({
          type: 'error',
          message: 'Failed to load drone configuration'
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!config) return;
    
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    
    const payload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: parseFloat(celsius)
    };
    
    try {
      const res = await fetch(`${API_BASE}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setStatus({
          type: 'success',
          message: 'Temperature logged successfully!'
        });
        setCelsius('');
      } else {
        setStatus({
          type: 'error',
          message: 'Error submitting temperature log'
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: 'Network error, please try again'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="card-container">
      <div className="status-indicator">Loading configuration data...</div>
    </div>
  );

  return (
    <div className="card-container">
      <div className="card-header">
        <span className="icon">🌡️</span>
        <h2>Submit Temperature</h2>
      </div>
      
      {status.message && (
        <div 
          className="status-indicator" 
          style={{
            color: status.type === 'success' ? '#4caf50' : '#f85149',
            marginBottom: '20px',
            fontSize: '14px',
            padding: '10px',
            backgroundColor: status.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(248, 81, 73, 0.1)',
            borderRadius: '4px'
          }}
        >
          {status.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Temperature (Celsius)</label>
          <input
            type="number"
            step="0.1"
            className="form-control"
            value={celsius}
            onChange={e => setCelsius(e.target.value)}
            placeholder="Enter temperature value"
            required
          />
        </div>
        
        <div className="data-row" style={{ border: 'none' }}>
          <div className="data-label">Drone ID</div>
          <div className="data-value">{config?.drone_id || DRONE_ID}</div>
        </div>
        
        <div className="data-row" style={{ border: 'none' }}>
          <div className="data-label">Drone Name</div>
          <div className="data-value">{config?.drone_name || 'Unknown'}</div>
        </div>
        
        <div className="data-row" style={{ border: 'none', marginBottom: '20px' }}>
          <div className="data-label">Country</div>
          <div className="data-value">{config?.country || 'Unknown'}</div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit Temperature'}
        </button>
      </form>
    </div>
  );
}