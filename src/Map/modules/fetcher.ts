import axios from 'axios';

const fetcher = axios.create({
    auth: {
        username: '*',
        password: '*',
    },
    timeout: 2000,
    withCredentials: false,
});

export default fetcher;
