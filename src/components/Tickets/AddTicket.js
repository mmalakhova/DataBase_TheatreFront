import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ticketsService from "../../services/tickets.service";
import performancesService from "../../services/performances.service";

const AddTicket = () => {

    const [price, setPrice] = useState();
    const [row, setRow] = useState();
    const [seat, setSeat] = useState();
    const [performance, setPerformance] = useState("");

    const [priceDirty, setPriceDirty] = useState(false);
    const [rowDirty, setRowDirty] = useState(false);
    const [seatDirty, setSeatDirty] = useState(false);
    const [performanceDirty, setPerformanceDirty] = useState(false);

    const [priceError, setPriceError] = useState('Поле не может быть пустым');
    const [rowError, setRowError] = useState('Поле не может быть пустым');
    const [seatError, setSeatError] = useState('Поле не может быть пустым');
    const [performanceError, setPerformanceError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);


    const [existingPerformances, setExistingPerformances] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const recordPerPage = 5;

    useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        performancesService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Performances names data', response.data.content);
                setExistingPerformances(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        if (priceError || rowError || seatError || performanceError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [priceError, rowError, seatError, performanceError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'price':
                setPriceDirty(true)
                break
            case 'row':
                setRowDirty(true)
                break
            case 'seat':
                setSeatDirty(true)
                break
            case 'performance':
                setPerformanceDirty(true)
                break
        }
    }

    const priceHandler = (e) => {
        setPrice(e.target.value)
        if (e.target.value === 0 || e.target.value < 100 || e.target.value > 10000)
            setPriceError('Некорректное значение')
        else if (!e.target.value)
            setPriceError('Поле не может быть пустым')
        else setPriceError('')
    }

    const rowHandler = (e) => {
        setRow(e.target.value)
        if (e.target.value = 0 || e.target.value > 50 || e.target.value < 0)
            setRowError('Некорректное значение')
        else if (!e.target.value)
            setRowError('Поле не может быть пустым')
        else setRowError('')
    }

    const seatHandler = (e) => {
        setSeat(e.target.value)
        if (e.target.value = 0 || e.target.value > 50 || e.target.value < 0)
            setSeatError('Некорректное значение')
        else if (!e.target.value)
            setSeatError('Поле не может быть пустым')
        else setRowError('')
    }

    const performanceHandler = (e) => {
        setPerformance(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 50)
            setPerformanceError('Некорректная длина')
        else if (!e.target.value)
            setPerformanceError('Поле не может быть пустым')
        else setPerformanceError('')
    }


    const saveTicket = (e) => {
        e.preventDefault();

        const ticket = { price, row, seat, performance, id };

        ticketsService.create(ticket)
            .then(response => {
                console.log('Ticket data added', response.data);
                history.push('/tickets');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    
    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить билет</h3>
            <form>
                <div className="form-group">
                    {(priceError && priceDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{priceError}</div>}
                    <input onChange={e => priceHandler(e)} onBlur={e => blurHandler(e)} name='price' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="price"
                        value={price}
                        placeholder="Введите цену"
                    />
                </div>
                <div className="form-group">
                    {(rowError && rowDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{rowError}</div>}
                    <input onChange={e => rowHandler(e)} onBlur={e => blurHandler(e)} name='row' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="row"
                        value={row}
                        placeholder="Введите ряд"
                    />
                </div>
                <div className="form-group">
                    {(seatError && seatDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{seatError}</div>}
                    <input onChange={e => seatHandler(e)} onBlur={e => blurHandler(e)} name='seat' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="seat"
                        value={seat}
                        placeholder="Введите место"
                    />
                </div>
                <div className="form-group">
                    {(performanceError && performanceDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{performanceError}</div>}
                    <input onChange={e => performanceHandler(e)} onBlur={e => blurHandler(e)} name='performance' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="performance"
                        value={performance}
                        placeholder="Введите название спектакля"
                    />
                </div>

                <select style={{ marginLeft: 2 }} className='form-select' name="colValue" /*onChange={handleChange}*/>
                    <option>Выберите</option>
                    {
                        existingPerformances.map(obj => (
                            <option>{obj.name}</option>
                        ))
                    }
                </select>

                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveTicket(e)}>
                        Сохранить
                    </button>
                    <Link to="/tickets" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку билетов</Link>
                </div>
            </form>

        </div>
    );
}

export default AddTicket;