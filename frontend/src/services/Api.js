import axios from 'axios'

const Api = axios.create({
    baseURL: `${document.location.protocol}//${document.location.hostname}:8390`,
});

export default Api;
