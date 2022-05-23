import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ticketsService from "../../services/tickets.service";

const UpdateTicket = () => {

    const [price, setPrice] = useState();
    const [row, setRow] = useState();
    const [seat, setSeat] = useState();
    const [performance, setPerformance] = useState("");

    const history = useHistory();

    let { id } = useParams();

    const saveTicket = (e) => {
        e.preventDefault();

        const ticket = { price, row, seat, performance, id };

        //update
        ticketsService.update(ticket)
            .then(response => {
                console.log('Ticket updated', response.data);
                history.push('/tickets');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    useEffect(() => {
        if (id) {
            ticketsService.get(id)
                .then(ticket => {
                    setPrice(ticket.data.price);
                    setRow(ticket.data.row);
                    setSeat(ticket.data.seat);
                    setPerformance(ticket.data.performance)
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить билет</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Введите цену"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="row"
                        value={row}
                        onChange={(e) => setRow(e.target.value)}
                        placeholder="Введите ряд"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="seat"
                        value={seat}
                        onChange={(e) => setSeat(e.target.value)}
                        placeholder="Введите место"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="performance"
                        value={performance}
                        onChange={(e) => setPerformance(e.target.value)}
                        placeholder="Введите название спектакля"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveTicket(e)}>
                        Сохранить
                    </button>
                    <Link to="/tickets" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку билетов</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateTicket;