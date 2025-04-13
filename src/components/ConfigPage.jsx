import { useEffect, useState } from 'react';
import { API_BASE, DRONE_ID } from '../config';

export default function ConfigPage() {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/configs/${DRONE_ID}`)
            .then(res => res.json())
            .then(data => {
                console.log("✅ Config loaded:", data); // <--- ดูใน console
                setConfig(data);
            })
            .catch(err => {
                console.error("❌ Failed to load config", err);
            });
    }, []);


    if (!config) return <p>Loading...</p>;

    return (
        <div>
            <h2>Drone Configuration</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>Drone ID:</strong> {config.drone_id}</li>
                <li className="list-group-item"><strong>Drone Name:</strong> {config.drone_name}</li>
                <li className="list-group-item"><strong>Light:</strong> {config.light}</li>
                <li className="list-group-item"><strong>Country:</strong> {config.country}</li>
                <li className="list-group-item"><strong>Weight:</strong> {config.weight}</li>
            </ul>
        </div>
    );
}
