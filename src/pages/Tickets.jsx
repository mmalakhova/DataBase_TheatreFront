import React from 'react';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ticketsService from '../services/tickets.service';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/esm/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";

function Tickets({

}) {
    const [tickets, setTickets] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const [sort, setSort] = React.useState(false);

    const [searchPrice, setSearchPrice] = React.useState();
    const [searchRow, setSearchRow] = React.useState();
    const [searchSeat, setSearchSeat] = React.useState();
    const [searchPerformance, setSearchPerformance] = React.useState("");

    const recordPerPage = 5;

    const [toggle, setToggle] = React.useState(false);

    React.useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        ticketsService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Tickets data', response.data.content);
                setTickets(response.data.content);
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
        ticketsService.remove(id)
            .then(response => {
                console.log('Ticket deleted', response.data);
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
        ticketsService.getAllSorted(currentPage - 1, recordPerPage, e.target.value)
            .then(response => {
                console.log('Tickets data', response.data);
                setTickets(response.data.content);
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

    const searchChangePrice = (e) => {
        // console.log(e.target.value)
        setSearchPrice(e.target.value)
    };

    const searchChangeRow = (e) => {
        // console.log(e.target.value)
        setSearchRow(e.target.value)
    };

    const searchChangeSeat = (e) => {
        // console.log(e.target.value)
        setSearchSeat(e.target.value)
    };

    const searchChangePerformance = (e) => {
        // console.log(e.target.value)
        setSearchPerformance(e.target.value)
    };

    const cancelSearch = (e) => {
        setSearchPrice('');
        setSearchRow('');
        setSearchSeat('');
        setSearchPerformance('');
        e.target.value = '';
        init(1);
    }

    const searchData = () => {
        ticketsService.getAllFiltered(currentPage - 1, recordPerPage, searchPrice, searchRow, searchSeat, searchPerformance)
            .then(response => {
                console.log('Authors data', response.data);
                setTickets(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    const showCheap = () => {
        toggle ? setToggle(true) : setToggle(false);
        if (toggle === true) {
            ticketsService.getCheap(currentPage-1, recordPerPage)
            .then(response => {
                console.log('Tickets data', response.data);
                setTickets(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
        } else {
            init(1)
        }
    }

    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase">билеты</h1>
                <Form style={{ marginLeft: 40, marginRight: 40 }}>

                    <Row>
                        <InputGroup style={{ marginBottom: 10 }}>
                            <FormControl style={{ marginRight: 10, width: 100 }} onChange={searchChangePrice} placeholder='Введите цену' name="search" value={searchPrice} />
                            <FormControl style={{ marginRight: 10, width: 100 }} onChange={searchChangeRow} placeholder='Введите ряд' name="search" value={searchRow} />
                            <FormControl style={{ marginRight: 10, width: 100 }} onChange={searchChangeSeat} placeholder='Введите место' name="search" value={searchSeat} />
                            <FormControl style={{ marginRight: 10, width: 100 }} onChange={searchChangePerformance} placeholder='Введите название спектакля' name="search" value={searchPerformance} />


                            <Button onClick={searchData} style={{ marginLeft: 0, background: "#D10000", borderColor: "#D10000" }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                            <Button onClick={cancelSearch} style={{ background: "#D10000", borderColor: "#D10000" }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>

                        </InputGroup>

                        <label style={{ marginRight: 10, marginBottom: 10 }}>Сортировать по:</label>
                        <select style={{ width: 300, marginLeft: 10 }} className='form-select' name="colValue" onChange={handleChange}>
                            <option>Выберите</option>
                            <option value="price">Цена</option>
                            <option value="row">Ряд</option>
                            <option value="seat">Место</option>
                            <option value="performance">Спектакль</option>
                        </select>
                        <Button className="btn-search" onClick={handleReset} style={{ background: "#D10000", borderColor: "#D10000", marginLeft: 10, width: 100 }} variant="primary">
                            Сбросить
                        </Button>

                        {/* <Form.Check onChange={showCheap}
                        style={{marginTop:10, marginLeft:10}}
                                type="switch"
                                id="custom-switch"
                                label="Показать дешевые билеты"
                            /> */}
                    </Row>
                </Form>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/tickets/add" style={{ marginLeft: 40, marginTop: 40, color: 'white' }} className="btn btn-dark mb-2">Добавить билет</Link>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Цена</th>
                            <th>Ряд</th>
                            <th>Место</th>
                            <th>Название спектакля</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tickets.map(obj => (
                                <tr key={obj.id}>
                                    <td>{obj.price}</td>
                                    <td>{obj.row}</td>
                                    <td>{obj.seat}</td>
                                    <td>{obj.performanceName}</td>
                                    <td>
                                        <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/tickets/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
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


export default Tickets;