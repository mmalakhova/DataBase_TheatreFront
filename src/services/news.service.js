import httpClient from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/news`);
}

export default {getAll};