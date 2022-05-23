import httpClient from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/tickets?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&price=&row=&seat=&performance=`);
}

const getCheap = (curPage, recordPerPage) => {
    return httpClient.get(`/tickets/cheap?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/tickets?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&price=&row=&seat=&performance=`);
}

const getAllFiltered = (curPage, recordPerPage, price, row, seat, performance) => {
    return httpClient.get(`/tickets?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&price=${price}&row=${row}&seat=${seat}&performance=${performance}`);
}

const create = (data) => {
   return httpClient.post("/tickets", data);
}

const get = (id) => {
    return httpClient.get(`/tickets/${id}`);
}

const update = (data) => {
    return httpClient.put('/tickets', data);
}

const remove = (id) => {
    return httpClient.delete(`/tickets/${id}`);
}

export default {getAll, getCheap, getAllSorted, getAllFiltered, create, get, update, remove};