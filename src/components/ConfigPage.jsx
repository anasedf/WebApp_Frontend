import React from 'react';

function ConfigPage({ droneConfig }) {
    if (!droneConfig) {
        return (
            <div className="text-center">
                <p>No configuration data available.</p>
            </div>
        );
    }

    return (
        <div className="config-page">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center">
                    <div className="content-section">
                        <h1 className="display-4 mb-4">
                            <span className="text-highlight">DRONE CONFIGS</span><br />
                            <span className="text-bold">65011173 </span><br />
                            <span className="text-bold">ANAS NILOH</span>
                        </h1>
                        <p className="lead">
                            IoT System & Information Engineering - KMITL <br />
                            2025 01236337 WEB APPLICATION DEVELOPMENT
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="drone-info-card">
                        <div className="drone-info-header">
                            <h2>Drone Configuration</h2>
                        </div>
                        <div className="drone-info-content">
                            <div className="info-item">
                                <span className="info-label">Drone ID</span>
                                <span className="info-value">{droneConfig.drone_id}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Drone Name</span>
                                <span className="info-value">{droneConfig.drone_name}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Light</span>
                                <span className="info-value">{droneConfig.light}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Country</span>
                                <span className="info-value">{droneConfig.country}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Weight</span>
                                <span className="info-value">{droneConfig.weight} kg</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfigPage;