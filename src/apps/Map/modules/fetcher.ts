import axios from 'axios';

const fetcher = axios.create({
    auth: {
        username: process.env.BASE_AUTH_API_USER,
        password: process.env.BASE_AUTH_API_SECRET,
    },
    timeout: 2000,
});

export default fetcher;
