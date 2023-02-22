import axios from 'axios';

const fetcher = (url: string, headers = {}) =>
    axios.get(url, { headers, withCredentials: true }).then((res) => res.data);

export default fetcher;
