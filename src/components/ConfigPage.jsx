import { useEffect, useState } from 'react';
import { API_BASE, DRONE_ID } from '../config';

export default function ConfigPage() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("API_BASE:", API_BASE);
        console.log("DRONE_ID:", DRONE_ID);

        fetch(`${API_BASE}/configs/${DRONE_ID}`)
            .then(res => res.json())
            .then(data => {
                console.log("✅ Config loaded:", data);
                setConfig(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("❌ Failed to load config", err);
                setError("Failed to load configuration");
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="card-container">
            <div className="status-indicator">Loading configuration data...</div>
        </div>
    );

    if (error) return (
        <div className="card-container">
            <div className="status-indicator" style={{color: '#f85149'}}>{error}</div>
        </div>
    );

    if (!config) return null;

    // Handle potential missing data gracefully
    const lastUpdated = new Date().toLocaleString();

    return (
        <div className="card-container">
            <div className="card-header">
                <span className="icon">ℹ️</span>
                <h2>Drone Configuration</h2>
            </div>
            
            <div className="data-row">
                <div className="data-label">Drone ID</div>
                <div className="data-value">{config.drone_id || DRONE_ID}</div>
            </div>
            
            <div className="data-row">
                <div className="data-label">Drone Name</div>
                <div className="data-value">{config.drone_name || 'Unknown'}</div>
            </div>
            
            <div className="data-row">
                <div className="data-label">Light</div>
                <div className="data-value">
                    <span className={`badge ${config.light === 'ON' ? 'badge-on' : 'badge-off'}`}>
                        {config.light || 'OFF'}
                    </span>
                </div>
            </div>
            
            <div className="data-row">
                <div className="data-label">Country</div>
                <div className="data-value">{config.country || 'Unknown'}</div>
            </div>
            
            <div className="data-row">
                <div className="data-label">Weight</div>
                <div className="data-value">{config.weight ? `${config.weight} kg` : 'N/A'}</div>
            </div>
            
            <div className="last-updated">
                Last updated: {config.last_updated || lastUpdated}
            </div>
        </div>
    );
}