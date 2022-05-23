import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import musiciansService from "../../services/musicians.service";


const AddMusician = () => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [instrument, setInstrument] = useState('');

    const [nameDirty, setNameDirty] = useState(false);
    const [ageDirty, setAgeDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [instrumentDirty, setInstrumentDirty] = useState(false);

    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [ageError, setAgeError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');
    const [instrumentError, setInstrumentError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        if (nameError || genderError || ageError || instrumentError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, genderError, ageError, instrumentError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'gender':
                setGenderDirty(true)
                break
            case 'age':
                setAgeDirty(true)
                break
            case 'instrument':
                setInstrumentDirty(true)
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


    const ageHandler = (e) => {
        setAge(e.target.value)
        if (!e.target.value || e.target.value === '') {
            setAgeError('Поле не может быть пустым')
        } else setAgeError('')
    }

    const instrumentHandler = (e) => {
        setInstrument(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 12)
            setInstrumentError('Некорректная длина')
        else if (!e.target.value)
            setInstrumentError('Поле не может быть пустым')
        else setInstrumentError('')
    }


    const saveMusician = (e) => {
        e.preventDefault();

        const musician = { name, gender, age, instrument, id };

        musiciansService.create(musician)
            .then(response => {
                console.log('Performance data added', response.data);
                history.push('/musicians');
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
                    {(genderError && genderDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{genderError}</div>}
                    <input onChange={e => genderHandler(e)} onBlur={e => blurHandler(e)} name='gender' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="gender"
                        value={gender}
                        placeholder="Введите возраст"
                    />
                </div>
                <div className="form-group">
                    {(ageError && ageDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{ageError}</div>}
                    <input onChange={e => ageHandler(e)} onBlur={e => blurHandler(e)} name='age' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="age"
                        value={age}
                        placeholder="Введите возвраст"
                    />
                </div>
                <div className="form-group">
                    {(instrumentError && instrumentDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{instrumentError}</div>}
                    <input onChange={e => instrumentHandler(e)} onBlur={e => blurHandler(e)} name='instrument' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="instrument"
                        value={instrument}
                        placeholder="Введите инструмент"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveMusician(e)}>
                        Сохранить
                    </button>
                    <Link to="/musicians" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку музыкантов</Link>
                </div>
            </form>

        </div>
    );
}

export default AddMusician;