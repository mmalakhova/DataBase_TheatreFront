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
import stageDirectorsService from '../services/stageDirectors.service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";


export default function StageDirectors({
}) {
    const [stageDirectors, setStageDirectors] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const [sort, setSort] = React.useState(false);

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        stageDirectorsService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Stage Directors data', response.data);
                setStageDirectors(response.data.content);
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
        stageDirectorsService.remove(id)
            .then(response => {
                console.log('Stage Dirctor deleted', response.data);
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
        stageDirectorsService.getAllSorted(currentPage - 1, recordPerPage, e.target.value)
            .then(response => {
                console.log('Authors data', response.data);
                setStageDirectors(response.data.content);
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
                <h1 className="text-uppercase">????????????????????????</h1>
                <Form style={{ marginLeft: 40, marginRight: 40 }}>

                    <Row>

                        <label stylew={{ marginRight: 10, marginBottom: 10 }}>?????????????????????? ????:</label>
                        <select style={{ width: 300, marginLeft: 10 }} className='form-select' name="colValue" onChange={handleChange}>
                            <option>????????????????</option>
                            <option value="name">??????</option>
                            <option value="typeOfStageDirector">?????? ????????????????????????</option>
                            <option value="gender">??????</option>
                            <option value="age">??????????????</option>
                        </select>
                        <Button className="btn-search" onClick={handleReset} style={{ background: "#D10000", borderColor: "#D10000", marginLeft: 10, width: 100 }} variant="primary">
                            ????????????????
                        </Button>
                    </Row>
                </Form>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/stagedirectors/add" style={{ marginLeft: 40, marginTop: 40, color: 'white' }} className="btn btn-dark mb-2">???????????????? ????????????????????????</Link>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>??????</th>
                            <th>?????? ????????????????????????</th>
                            <th>??????</th>
                            <th>??????????????</th>
                            <th>????????????????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stageDirectors.map(obj => (
                                <tr key={obj.id}>
                                    <td>{obj.name}</td>
                                    <td>{obj.stageDirectorType}</td>
                                    <td>{obj.gender}</td>
                                    <td>{obj.age}</td>
                                    <td>
                                        <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/stagedirectors/edit/${obj.id}`} className='btn btn-danger'>????????????????</Link>
                                        <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000", marginLeft: 10 }} onClick={(e) => { handleDelete(obj.id) }} className='btn btn-danger'>??????????????</Link>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
                <Table className="table" bordered="false">
                    <div style={{ float: 'left', marginLeft: 40, color: '#D10000' }}>
                        ???????????????? {currentPage} ???? {totalPages}
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
