import httpClient from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=&height=&age=&vocals=&gender=`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/actors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&name=&height=&age=&vocals=&gender=`);
}

const getAllFiltered = (curPage, recordPerPage, name, gender, height, age, vocals) => {
    return httpClient.get(`/actors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=${name}&height=${height}&age=${age}&vocals=${vocals}&gender=${gender}`);
}

const create = (data) => {
   return httpClient.post("/actors", data);
}

const get = (id) => {
    return httpClient.get(`/actors/${id}`);
}

const update = (data) => {
    return httpClient.put('/actors', data);
}

const remove = (id) => {
    return httpClient.delete(`/actors/${id}`);
}

export default {getAll, getAllSorted, getAllFiltered, create, get, update, remove};