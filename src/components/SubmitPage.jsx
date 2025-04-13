import { useEffect, useState } from 'react';
import { API_BASE, DRONE_ID } from '../config';

export default function SubmitPage() {
  const [config, setConfig] = useState(null);
  const [celsius, setCelsius] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/configs/${DRONE_ID}`)
      .then(res => res.json())
      .then(data => setConfig(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!config) return;
    const payload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: parseFloat(celsius)
    };
    const res = await fetch(`${API_BASE}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      alert('Submitted!');
      setCelsius('');
    } else {
      alert('Error submitting log');
    }
  };

  return (
    <div>
      <h2>Submit Temperature</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Celsius</label>
          <input
            type="number"
            className="form-control"
            value={celsius}
            onChange={e => setCelsius(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
}
