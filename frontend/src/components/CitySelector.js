import React, { useState } from 'react';
import './CitySelector.css'; // Import the CSS file for styles

const CitySelector = ({ selectedCity, setSelectedCity }) => {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
    const [inputValue, setInputValue] = useState('');

    const handleSelectChange = (e) => {
        setSelectedCity(e.target.value);
        setInputValue(''); // Clear input when a city is selected
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setSelectedCity(e.target.value); // Update selected city as user types
    };

    return (
        <div className="city-selector">
            <label htmlFor="city">Select City or Type:</label>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a city"
                className="city-input"
            />
            <select
                id="city"
                value={selectedCity}
                onChange={handleSelectChange}
                className="city-dropdown"
            >
                <option value="" disabled>Select a city</option>
                {cities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CitySelector;
