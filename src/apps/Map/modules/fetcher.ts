import axios from 'axios';

const fetcher = axios.create({
    auth: {
        username: '',
        password: '',
    },
    timeout: 2000,
});

export default fetcher;
