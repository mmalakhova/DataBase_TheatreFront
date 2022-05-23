import httpClient from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/concerttours?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&title=&descr=&start_date=&end_date=`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/concerttours?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&title=&descr=&start_date=&end_date=`);
}

const getAllFiltered = (curPage, recordPerPage, title, descr, startDate, endDate) => {
    return httpClient.get(`/concerttours?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&title=${title}&descr=${descr}&start_date=${startDate}&end_date=${endDate}`);
}

const create = (data) => {
   return httpClient.post("/concerttours", data);
}

const get = (id) => {
    return httpClient.get(`/concerttours/${id}`);
}

const update = (data) => {
    return httpClient.put('/concerttours', data);
}

const remove = (id) => {
    return httpClient.delete(`/concerttours/${id}`);
}

export default {getAll, getAllSorted, getAllFiltered, create, get, update, remove};