import { useState } from 'react';

function SubmitPage({ droneConfig }) {
  const [celsius, setCelsius] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', isError: false });

  if (!droneConfig) {
    return (
      <div className="text-center">
        <p>No configuration data available. Please check the Config page first.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!celsius || isNaN(parseFloat(celsius))) {
      setSubmitStatus({
        message: 'Please enter a valid temperature value',
        isError: true
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ message: '', isError: false });

    try {
      const logData = {
        drone_id: droneConfig.drone_id,
        drone_name: droneConfig.drone_name,
        country: droneConfig.country,
        celsius: parseFloat(celsius)
      };

      const response = await fetch('https://webapp-backend-ejxa.onrender.com/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit log data');
      }

      const data = await response.json();
      setCelsius('');
      setSubmitStatus({
        message: 'Temperature log submitted successfully!',
        isError: false
      });
    } catch (error) {
      console.error('Error submitting log:', error);
      setSubmitStatus({
        message: 'Failed to submit temperature log. Please try again.',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-page">
      <div className="row">
        <div className="col-md-6">
          <div className="content-section">
            <h1 className="display-4 mb-4">
              <span className="text-highlight">THE CREATIVE</span><br />
              <span className="text-bold">EDGE!</span>
            </h1>
            <p className="lead">
              Track your drone's performance with real-time temperature logs.
              Monitor conditions and ensure optimal flight performance.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-card">
            <h2>Temperature Log Form</h2>
            <div className="card-content">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="info-display">
                    <div className="info-row">
                      <span>Drone:</span>
                      <span>{droneConfig.drone_name} (ID: {droneConfig.drone_id})</span>
                    </div>
                    <div className="info-row">
                      <span>Country:</span>
                      <span>{droneConfig.country}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="celsius" className="form-label">Temperature (°C)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="celsius"
                    value={celsius}
                    onChange={(e) => setCelsius(e.target.value)}
                    placeholder="Enter temperature in celsius"
                    required
                  />
                </div>
                
                {submitStatus.message && (
                  <div className={`alert ${submitStatus.isError ? 'alert-danger' : 'alert-success'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Submitting...
                    </>
                  ) : 'Submit Data'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPage;