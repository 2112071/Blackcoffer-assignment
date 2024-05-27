// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        year: '',
        topic: '',
        sector: '',
        region: '',
    });

    useEffect(() => {
        axios.get('http://localhost:3000/data', { params: filters })
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const chartData = {
        labels: data.map(d => d.year),
        datasets: [
            {
                label: 'Intensity',
                data: data.map(d => d.intensity),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Likelihood',
                data: data.map(d => d.likelihood),
                borderColor: 'rgba(153,102,255,1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <h1>Data Visualization Dashboard</h1>
            <div>
                <label>
                    Year:
                    <input type="text" name="year" onChange={handleFilterChange} />
                </label>
                <label>
                    Topic:
                    <input type="text" name="topic" onChange={handleFilterChange} />
                </label>
                <label>
                    Sector:
                    <input type="text" name="sector" onChange={handleFilterChange} />
                </label>
                <label>
                    Region:
                    <input type="text" name="region" onChange={handleFilterChange} />
                </label>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default Dashboard;
