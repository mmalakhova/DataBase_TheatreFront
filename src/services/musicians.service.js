import httpClient from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/musicians?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=&gender=&age=&instrument=`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/musicians?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&name=&gender=&age=&instrument=`);
}

const getAllFiltered = (curPage, recordPerPage, name, gender, age, instrument) => {
    return httpClient.get(`/musicians?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=${name}&gender=${gender}&age=${age}&instrument=${instrument}`);
}

const create = (data) => {
   return httpClient.post("/musicians", data);
}

const get = (id) => {
    return httpClient.get(`/musicians/${id}`);
}

const update = (data) => {
    return httpClient.put('/musicians', data);
}

const remove = (id) => {
    return httpClient.delete(`/musicians/${id}`);
}

export default {getAll, getAllSorted, getAllFiltered, create, get, update, remove};