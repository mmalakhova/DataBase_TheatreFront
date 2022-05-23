import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import performancesService from "../../services/performances.service";
import authorsService from "../../services/authors.service";
import concertToursService from "../../services/concertTours.service";


const AddPerformance = () => {
    const [authorEntity, setAuthorEntity] = useState();
    const [concertTourEntity, setConcertTourEntity] = useState();


    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [ageRating, setAgeRating] = useState('');
    const [date, setDate] = useState('');
    const [descr, setDescr] = useState('');
    const [author, setAuthor] = useState(0);
    const [concertTour, setConcertTour] = useState(0);

    const [nameDirty, setNameDirty] = useState(false);
    const [genreDirty, setGenreDirty] = useState(false);
    const [ageRatingDirty, setAgeRatingDirty] = useState(false);
    const [dateDirty, setDateDirty] = useState(false);
    const [descrDirty, setDescrDirty] = useState(false);
    const [authorDirty, setAuthorDirty] = useState(false);
    const [concertTourDirty, setConcertTourDirty] = useState(false);

    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [genreError, setGenreError] = useState('Поле не может быть пустым');
    const [ageRatingError, setAgeRatingError] = useState('Поле не может быть пустым');
    const [dateError, setDateError] = useState('Поле не может быть пустым');
    const [descrError, setDescrError] = useState('Поле не может быть пустым');
    const [authorError, setAuthorError] = useState('Поле не может быть пустым');
    const [concertTourError, setConcertTourError] = useState('Поле не может быть пустым');

    const [existingAuthors, setExistingAuthors] = useState([])
    const [existingConcertTours, setExistingConcertTours] = useState([])

    const [performances, setPerformances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const recordPerPage = 5;

    useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        authorsService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                setExistingAuthors(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        concertToursService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log(response.data);
                setExistingConcertTours(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }



    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        if (nameError || genreError || ageRatingError || dateError || descrError || authorError || concertTourError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, genreError, ageRatingError, dateError, descrError, authorError, concertTourError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'genre':
                setGenreDirty(true)
                break
            case 'ageRating':
                setAgeRatingDirty(true)
                break
            case 'date':
                setDateDirty(true)
                break
            case 'descr':
                setDescrDirty(true)
                break
            case 'author':
                setAuthorDirty(true)
                break
            case 'concertTour':
                setConcertTourDirty(true)
                break
        }
    }

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 30)
            setNameError('Некорректная длина')
        else if (!e.target.value)
            setNameError('Поле не может быть пустым')
        else setNameError('')
    }

    const genreHandler = (e) => {
        setGenre(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 30)
            setGenreError('Некорректная длина')
        else if (!e.target.value)
            setGenreError('Поле не может быть пустым')
        else setGenreError('')
    }

    const ageRatingHandler = (e) => {
        setAgeRating(e.target.value)
        if (!e.target.value || e.target.value === '') {
            setAgeRatingError('Поле не может быть пустым')
        } else setAgeRatingError('')
    }

    const dateHandler = (e) => {
        setDate(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 12)
            setDateError('Некорректная длина')
        else if (!e.target.value)
            setDateError('Поле не может быть пустым')
        else setDateError('')
    }

    const descrHandler = (e) => {
        setDescr(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 70)
            setDescrError('Некорректная длина')
        else if (!e.target.value)
            setDescrError('Поле не может быть пустым')
        else setDescrError('')
    }

    const authorHandler = (e) => {
        setAuthor(parseInt(e.target.value))
        if (!e.target.value)
            setAuthorError('Поле не может быть пустым')
        else setAuthorError('')
    }

    const concertTourHandler = (e) => {
        console.log(parseInt(e.target.value))
        setConcertTour(parseInt(e.target.value))
        if (!e.target.value)
            setConcertTourError('Поле не может быть пустым')
        else setConcertTourError('')
    }



    const savePerformance = (e) => {
        e.preventDefault();
       // const authorEntity
        authorsService.get(author).then(response => {
            setAuthorEntity(response.data)
        })
        concertToursService.get(concertTour).then(response => {
            setConcertTourEntity(response.data)
        })


        const performance = { name, genre, ageRating, date, descr, author, concertTour, id };

        console.log(performance)

        performancesService.create(performance)
            .then(response => {
                console.log('Performance data added', response.data);
                history.push('/performances');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить новый спектакль</h3>
            <form>
                <div className="form-group">
                    {(nameError && nameDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{nameError}</div>}
                    <input onChange={e => nameHandler(e)} onBlur={e => blurHandler(e)} name='name' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="name"
                        value={name}
                        placeholder="Введите название"
                    />
                </div>
                <div className="form-group">
                    {(genreError && genreDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{genreError}</div>}
                    <input onChange={e => genreHandler(e)} onBlur={e => blurHandler(e)} name='genre' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="genre"
                        value={genre}
                        placeholder="Введите жанр"
                    />
                </div>
                <div className="form-group">
                    {(ageRatingError && ageRatingDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{ageRatingError}</div>}
                    <input onChange={e => ageRatingHandler(e)} onBlur={e => blurHandler(e)} name='ageRating' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="ageRating"
                        value={ageRating}
                        placeholder="Введите возврастной рейтинг"
                    />
                </div>
                <div className="form-group">
                    {(dateError && dateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{dateError}</div>}
                    <input onChange={e => dateHandler(e)} onBlur={e => blurHandler(e)} name='date' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="date"
                        value={date}
                        placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(descrError && descrDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{descrError}</div>}
                    <input onChange={e => descrHandler(e)} onBlur={e => blurHandler(e)} name='descr' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="descr"
                        value={descr}
                        placeholder="Введите описание"
                    />
                </div>
                <div>
                <select onChange={e => authorHandler(e)} style={{ marginBottom: 10, width:600 }} className='form-select' name="colValue">
                    <option>Выберите атвора</option>
                    {
                        existingAuthors.map(obj => (
                            <option value={obj.id}>{obj.name}</option>
                        ))
                    }
                </select>
                </div>
                <div>
                <select onChange={e => concertTourHandler(e)} style={{width: 600}} className='form-select' name="colValue">
                    <option>Выберите гастроли</option>
                    {
                        existingConcertTours.map(obj => (
                            <option value={obj.id}>{obj.title}</option>
                        ))
                    }
                </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => savePerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/performances" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку спектаклей</Link>
                </div>
            </form>

        </div>
    );
}

export default AddPerformance;