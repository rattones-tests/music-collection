import axios from 'axios'

const Api = axios.create({
    baseURL: "http://api.music-collect.local:8390",
});

export default Api;