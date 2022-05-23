import httpClient from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/stagedirectors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=&type=&gender=&age=`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/stagedirectors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&name=&type=&gender=&age=`);
}

const getAllFiltered = (curPage, recordPerPage, name, type, gender, age) => {
    return httpClient.get(`/stagedirectors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=${name}&type=${type}&gender=${gender}&age=${age}`);
}

const create = (data) => {
   return httpClient.post("/stagedirectors", data);
}

const get = (id) => {
    return httpClient.get(`/stagedirectors/${id}`);
}

const update = (data) => {
    return httpClient.put('/stagedirectors', data);
}

const remove = (id) => {
    return httpClient.delete(`/stagedirectors/${id}`);
}

export default {getAll, getAllSorted, getAllFiltered, create, get, update, remove};