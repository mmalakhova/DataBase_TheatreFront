import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import authorsService from "../../services/authors.service";

const AddAuthor = () => {

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [countryDirty, setCountrDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [countryError, setCountryError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect( () => {
        if (nameError || countryError || genderError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, countryError, genderError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'country':
                setCountrDirty(true)
                break
            case 'gender':
                setGenderDirty(true)
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

    const countryHandler = (e) => {
        setCountry(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 30)
            setCountryError('Некорректная длина')
        else if (!e.target.value)
            setCountryError('Поле не может быть пустым')
        else setCountryError('')
    }

    const genderHandler = (e) => {
        setGender(e.target.value)
        if ((e.target.value.toLowerCase() === 'мужчина') || (e.target.value.toLowerCase() === 'женщина')) {
            setGenderError('')
        } else if (!e.target.value || e.target.value === '') {
            setGenderError('Поле не может быть пустым')
        } else {
            setGenderError('Поле может содержать значения "мужчина/женщина"')
        }
    }


    const saveAuthor = (e) => {
        e.preventDefault();

        const author = { name, country, gender, id };

        authorsService.create(author)
            .then(response => {
                console.log('Author data added', response.data);
                history.push('/authors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового автора</h3>
            <form>
                <div className="form-group">
                    {(nameError && nameDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{nameError}</div>}
                    <input onChange={e => nameHandler(e)} onBlur={e => blurHandler(e)} name='name' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="name"
                        value={name}
                        placeholder="Введите имя"
                    />
                </div>
                <div className="form-group">
                    {(countryError && countryDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{countryError}</div>}
                    <input onChange={e => countryHandler(e)} onBlur={e => blurHandler(e)} name='country' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="country"
                        value={country}
                        placeholder="Введите название страны"
                    />
                </div>
                <div className="form-group">
                    {(genderError && genderDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{genderError}</div>}
                    <input onChange={e => genderHandler(e)} onBlur={e => blurHandler(e)} name='gender' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="gender"
                        value={gender}
                        placeholder="Введите пол"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveAuthor(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку авторов</Link>
                </div>
            </form>

        </div>
    );
}

export default AddAuthor;