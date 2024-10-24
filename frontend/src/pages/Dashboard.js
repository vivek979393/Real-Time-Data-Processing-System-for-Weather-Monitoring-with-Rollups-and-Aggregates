import React, { useEffect, useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import WeatherChart from '../components/WeatherChart';
import Alert from '../components/Alert';
import CitySelector from '../components/CitySelector';

const Dashboard = () => {
    const [selectedCity, setSelectedCity] = useState('Delhi');
    const [weatherData, setWeatherData] = useState([]);
    const [dailySummaries, setDailySummaries] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!selectedCity) return;
            try {
                const response = await fetch(`http://localhost:5000/api/weather/${selectedCity}`);
                const data = await response.json();
                setWeatherData(data);

                if (data.temp > 35) {
                    setAlerts((prev) => [...prev, 'Heat alert: Temperature exceeds 35°C!']);
                }
            } catch (error) {
                setAlerts((prev) => [...prev, 'Error fetching weather data.']);
            }
        };

        const fetchDailySummaries = async () => {
            
                const response = await fetch('http://localhost:5000/api/daily-summaries');
                
                const data = await response.json();
                console.log(data); // Log the data for debugging
                setDailySummaries(data);
            
        };

        fetchWeather();
        fetchDailySummaries();
    }, [selectedCity]);

    return (
        <div>
            <h1>Weather Dashboard</h1>
            <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
            <WeatherCard weatherData={weatherData} setWeatherData={setWeatherData} />
            <Alert alerts={alerts} />
            <WeatherChart dailySummaries={dailySummaries} setDailySummaries={setDailySummaries} />
        </div>
    );
};

export default Dashboard;
