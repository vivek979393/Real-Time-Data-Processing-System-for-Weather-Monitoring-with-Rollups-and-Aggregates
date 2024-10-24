import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css'; // Import CSS for styling

const Alert = ({ alerts }) => {
    if (alerts.length === 0) return null;

    return (
        <div className="alert-container">
            {alerts.map((alert, index) => (
                <div key={index} className="alert">
                    <p>{alert}</p>
                </div>
            ))}
        </div>
    );
};

// PropTypes for validation
Alert.propTypes = {
    alerts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Alert;
