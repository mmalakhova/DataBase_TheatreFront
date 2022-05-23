import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { Link } from 'react-router-dom';
import performancesService from '../services/performances.service';

function Performances({
    
}) {
    const [performances, setPerformances] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const recordPerPage = 5;

    const [sort, setSort] = React.useState(false);

    const [searchName, setSearchName] = React.useState("");
    const [searchGenre, setSearchGenre] = React.useState("");
    const [searchAgeRating, setSearchAgeRating] = React.useState("");
    const [searchDate, setSearchDate] = React.useState("");
    const [searchDescr, setSearchDescr] = React.useState("");
    const [searchAuthor, setSearchAuthor] = React.useState("");
    const [searchConcertTour, setSearchConcertTour] = React.useState("");



    React.useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        performancesService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Performances data', response.data);
                setPerformances(response.data.content);
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
        performancesService.remove(id)
            .then(response => {
                console.log('Performance deleted', response.data);
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
        performancesService.getAllSorted(currentPage - 1, recordPerPage, e.target.value)
            .then(response => {
                console.log('Performances data', response.data);
                setPerformances(response.data.content);
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

    const searchChangeName = (e) => {
        // console.log(e.target.value)
        setSearchName(e.target.value)
    };

    const searchChangeGenre = (e) => {
        // console.log(e.target.value)
        setSearchGenre(e.target.value)
    };

    const searchChangeAgeRating = (e) => {
        // console.log(e.target.value)
        setSearchAgeRating(e.target.value)
    };

    const searchChangeDate = (e) => {
        // console.log(e.target.value)
        setSearchDate(e.target.value)
    };

    const cancelSearch = (e) => {
        setSearchName('');
        setSearchGenre('');
        setSearchAgeRating('');
        setSearchDate('');
        e.target.value = '';
        init(1);
    }

    const searchData = () => {
        performancesService.getAllFiltered(currentPage - 1, recordPerPage, searchName, searchGenre, searchAgeRating, searchDate)
            .then(response => {
                console.log('Performances data', response.data);
                setPerformances(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase">спектакли</h1>
                <Form style={{ marginLeft: 40, marginRight: 40 }}>

                    <Row>
                        {/* <InputGroup style={{ marginBottom: 10 }}>
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeName} placeholder='Введите название' name="search" value={searchName} />
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeGenre} placeholder='Введите жанр' name="search" value={searchGenre} />
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeAgeRating} placeholder='Введите возврастной рейтинг' name="search" value={searchAgeRating} />
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeDate} placeholder='Введите дату' name="search" value={searchDate} />


                            <Button onClick={searchData} style={{ marginLeft: 0, background: "#D10000", borderColor: "#D10000" }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                            <Button onClick={cancelSearch} style={{ background: "#D10000", borderColor: "#D10000" }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>

                        </InputGroup> */}

                        <label style={{ marginRight: 10, marginBottom: 10 }}>Сортировать по:</label>
                        <select style={{ width: 300, marginLeft: 10 }} className='form-select' name="colValue" onChange={handleChange}>
                            <option>Выберите</option>
                            <option value="name">Имя</option>
                            <option value="genre">Жанру</option>
                            <option value="date">Дате</option>
                        </select>
                        <Button className="btn-search" onClick={handleReset} style={{ background: "#D10000", borderColor: "#D10000", marginLeft: 10, width: 100 }} variant="primary">
                            Сбросить
                        </Button>
                    </Row>
                </Form>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/performances/add" style={{ marginLeft: 40, marginTop: 40, color: 'white' }} className="btn btn-dark mb-2">Добавить спектакль</Link>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                        <tr>
                            <th>Название</th>
                            <th>Жанр</th>
                            <th>Дата</th>
                            <th>Возрастной рейтинг</th>
                            <th>Описание</th>
                            <th>Автор</th>
                            <th>Гастроли</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            performances.map(obj => (
                                <tr key={obj.id}>
                                    <td style={{width:100}}>{obj.name}</td>
                                    <td style={{width:100}}>{obj.genre}</td>
                                    <td style={{width:100}}>{obj.date}</td>
                                    <td style={{width:100}}>{obj.ageRating}</td>
                                    <td style={{width:100}}>{obj.descr}</td>
                                    <td style={{width:100}}>{obj.authorName}</td>
                                    <td style={{width:100}}>{obj.concertTourName}</td>
                                    <td style={{width:160}}>
                                        <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/performances/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
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

export default Performances;