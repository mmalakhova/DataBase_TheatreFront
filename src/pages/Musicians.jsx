import React, { Component } from 'react';
import Pagination from "react-js-pagination"

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';
import musiciansService from '../services/musicians.service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";


export default function Musicians({


}) {
    const [musicians, setMusicians] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const [sort, setSort] = React.useState(false);

    const [searchName, setSearchName] = React.useState("");
    const [searchCountry, setSearchCountry] = React.useState("");
    const [searchGender, setSearchGender] = React.useState("");

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        musiciansService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Musicians data', response.data);
                setMusicians(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const handleDelete = id => {
        musiciansService.remove(id)
            .then(response => {
                console.log('Musician deleted', response.data);
                init(currentPage);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const showNextPage = () => {
        console.log(currentPage);
        console.log(totalElements);
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(currentPage + 1);
        }
        console.log(totalElements);
    };
    //Show Last Page
    const showLastPage = () => {
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(Math.ceil(totalElements / recordPerPage));
        }
    };
    //Show First page
    const showFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            init(firstPage);
        }
    };
    //Show previous page
    const showPrevPage = () => {
        let prevPage = 1
        if (currentPage > prevPage) {
            init(currentPage - prevPage);
        }
    };

    const handleChange = (e) => {
        setSort(true);
        console.log(e.target.value);
        musiciansService.getAllSorted(currentPage - 1, recordPerPage, e.target.value)
            .then(response => {
                console.log('Musicians data', response.data);
                setMusicians(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    const handleReset = () => {
        setSort(false);
        init(1);
    };

   
    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase">музыканты</h1>
                <Form style={{ marginLeft: 40, marginRight: 40 }}>

                    <Row>

                        <label style={{ marginRight: 10, marginBottom: 10 }}>Сортировать по:</label>
                        <select style={{ width: 300, marginLeft: 10 }} className='form-select' name="colValue" onChange={handleChange}>
                            <option>Выберите</option>
                            <option value="name">Имя</option>
                            <option value="country">Страна</option>
                            <option value="gender">Пол</option>
                        </select>
                        <Button className="btn-search" onClick={handleReset} style={{ background: "#D10000", borderColor: "#D10000", marginLeft: 10, width: 100 }} variant="primary">
                            Сбросить
                        </Button>
                    </Row>
                </Form>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/musicians/add" style={{ marginLeft: 40, marginTop: 40, color: 'white' }} className="btn btn-dark mb-2">Добавить музыканта</Link>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Имя</th>
                            <th>Пол</th>
                            <th>Возраст</th>
                            <th>Инструмент</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            musicians.map(obj => (
                                <tr key={obj.id}>
                                    <td>{obj.name}</td>
                                    <td>{obj.gender}</td>
                                    <td>{obj.age}</td>
                                    <td>{obj.instrument}</td>
                                    <td>
                                        <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/musicians/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
                                        <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000", marginLeft: 10 }} onClick={(e) => { handleDelete(obj.id) }} className='btn btn-danger'>Удалить</Link>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
                <Table className="table" bordered="false">
                    <div style={{ float: 'left', marginLeft: 40, color: '#D10000' }}>
                        Страница {currentPage} из {totalPages}
                    </div>
                    <div style={{ float: 'right', marginRight: 35 }}>
                        <nav>
                            <ul class="pagination">
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === 1 ? true : false} onClick={showPrevPage}>Previous</a></li>
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === 1 ? true : false} onClick={showFirstPage}>First</a></li>
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === totalPages ? true : false} onClick={showNextPage}>Next</a></li>
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === totalPages ? true : false} onClick={showLastPage}>Last</a></li>
                            </ul>
                        </nav>
                    </div>
                </Table>

            </div>

        </div >
    );
}
