import axios from 'axios'

const Api = axios.create({
    baseURL: "http://api.music-collection.local:8390",
});

export default Api;
