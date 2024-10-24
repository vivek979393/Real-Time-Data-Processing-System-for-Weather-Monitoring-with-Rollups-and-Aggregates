// routes/weather.js
const express = require('express');
const Weather = require('../models/Weather');
const axios = require('axios');
const router = express.Router();

// Fetch weather data for a selected city from OpenWeather API
router.get('/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        
        const weatherData = {
            city: response.data.name,
            temp: response.data.main.temp,
            feels_like: response.data.main.feels_like,
            condition: response.data.weather[0].description,
            
        };

        // Optionally save to database
        const newWeather = new Weather({
            city: weatherData.city,
            date: new Date(),
            avgTemp: weatherData.temp, // You may want to store avg, max, min separately
            maxTemp: response.data.main.temp_max,
            minTemp: response.data.main.temp_min,
        });
        await newWeather.save();

        const summaryDate = new Date().setHours(0, 0, 0, 0); // Reset time to midnight
        const existingSummary = await Weather.findOne( { city: new RegExp(`^${city}$`, 'i') } );

        if (existingSummary) {
            existingSummary.avgTemp = (existingSummary.avgTemp + weatherData.temp) / 2; // Example logic for averaging
            existingSummary.maxTemp = Math.max(existingSummary.maxTemp, weatherData.temp);
            existingSummary.minTemp = Math.min(existingSummary.minTemp, weatherData.temp);
            existingSummary.dominantCondition = existingSummary.dominantCondition; // You can implement logic to determine this
            await existingSummary.save();
        } else {
            const newSummary = new DailySummary({
                city,
                date: summaryDate,
                avgTemp: weatherData.temp,
                maxTemp: weatherData.temp,
                minTemp: weatherData.temp,
                dominantCondition: weatherData.condition,
            });
            await newSummary.save();
        }

        res.json(weatherData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching weather data', error: error.message });
    }
});

// Fetch daily summaries from MongoDB
router.get('/daily-summaries', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const dailySummaries = await Weather.find({}).lean()
        
            .sort({ date: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
            

        const total = await Weather.countDocuments();
        res.json({
            data: dailySummaries,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});




module.exports = router;
