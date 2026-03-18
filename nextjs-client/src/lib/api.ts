import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5073/api', // Adjust port if necessary based on dotnet output
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
