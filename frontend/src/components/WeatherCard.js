

import React from 'react';
import PropTypes from 'prop-types';
import './WeatherCard.css'; // Import CSS for styling

const WeatherCard = ({ weatherData }) => {
    if (!weatherData) {
        return <p>No weather data available.</p>;
    }

    return (
        <div className="weather-card">
            <h2>{weatherData.city}</h2>
            <p>Temperature: {weatherData.temp} °C</p>
            <p>Feels Like: {weatherData.feels_like} °C</p>
            <p>Condition: {weatherData.condition}</p>
            
        </div>
    );
};

// PropTypes for validation
WeatherCard.propTypes = {
    weatherData: PropTypes.shape({
        city: PropTypes.string.isRequired,
        temp: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
        condition: PropTypes.string.isRequired,
    }),
};

export default WeatherCard;
