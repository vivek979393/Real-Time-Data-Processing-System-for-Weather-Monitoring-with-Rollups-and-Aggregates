import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the scales and elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WeatherChart = ({ dailySummaries }) => {
   

    // Prepare the data for the chart
    const data = {
        labels: dailySummaries.map(summary => new Date(summary.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: dailySummaries.map(summary => parseFloat(summary.avgTemp)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Max Temperature (°C)',
                data: dailySummaries.map(summary => parseFloat(summary.maxTemp)),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Min Temperature (°C)',
                data: dailySummaries.map(summary => parseFloat(summary.minTemp)),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Weather Summaries',
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return `${label}: ${value} °C`;
                    },
                },
            },
        },
    };

    return <Bar data={data} options={options} />;
};

// PropTypes for validation
WeatherChart.propTypes = {
    dailySummaries: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            avgTemp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            maxTemp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            minTemp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        })
    ).isRequired,
};

export default WeatherChart;
