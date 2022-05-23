import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const AddStageDirector = () => {

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const [nameDirty, setNameDirty] = useState(false);
    const [typeDirty, setTypeDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [ageDirty, setAgeDirty] = useState(false);

    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [typeError, setTypeError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');
    const [ageError, setAgeError] = useState('Поле не может быть пустым');

    const history = useHistory();

    let { id } = useParams();

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (nameError || typeError || genderError || ageError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, typeError, genderError, ageError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'type':
                setTypeDirty(true)
                break
            case 'gender':
                setGenderDirty(true)
                break
            case 'age':
                setAgeDirty(true)
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

    const typeHandler = (e) => {
        setType(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 30)
            setTypeError('Некорректная длина')
        else if (!e.target.value)
            setTypeError('Поле не может быть пустым')
        else setTypeError('')
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
        if (!e.target.value)
            setAgeError('Поле не может быть пустым')
        else setAgeError('')
    }


    const saveStageDirector = (e) => {
        e.preventDefault();

        const stageDirector = { name, type, gender, id };

        stageDirectorsService.create(stageDirector)
            .then(response => {
                console.log('СoncertTour data added', response.data);
                history.push('/stagedirectors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового постановщика</h3>
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
                    {(typeError && typeDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{typeError}</div>}
                    <input onChange={e => typeHandler(e)} onBlur={e => blurHandler(e)} name='type' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="type"
                        value={type}
                        placeholder="Введите тип постановщика"
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
                <div className="form-group">
                    {(ageError && ageDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{ageError}</div>}
                    <input onChange={e => ageHandler(e)} onBlur={e => blurHandler(e)} name='age' style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="age"
                        value={age}
                        placeholder="Введите возраст"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveStageDirector(e)}>
                        Сохранить
                    </button>
                    <Link to="/stagedirectors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку постановщиков</Link>
                </div>
            </form>

        </div>
    );
}

export default AddStageDirector;