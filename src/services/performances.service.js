import httpClient from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/performances?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=&genre=&age_rating=&date=`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/performances?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&name=&genre=&age_rating=&date=`);
}

const getAllFiltered = (curPage, recordPerPage, name, genre, ageRating, date) => {
    return httpClient.get(`/performances?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=${name}&genre=${genre}&age_rating=${ageRating}&date=${date}`);
}

const create = (data) => {
   return httpClient.post("/performances", data);
}

const get = (id) => {
    return httpClient.get(`/performances/${id}`);
}

const update = (data) => {
    return httpClient.put('/performances', data);
}

const remove = (id) => {
    return httpClient.delete(`/performances/${id}`);
}

export default {getAll, getAllSorted, getAllFiltered, create, get, update, remove};