import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import musiciansService from "../../services/musicians.service";

const UpdateMusician = () => {

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

    const history = useHistory();

    let { id } = useParams();

    const saveMusician = (e) => {
        e.preventDefault();

        const musician = { name, age, gender, instrument, id };

        //update
        musiciansService.update(musician)
            .then(response => {
                console.log('Musician updated', response.data);
                history.push('/musicians');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    useEffect(() => {
        if (id) {
            musiciansService.get(id)
                .then(Musician => {
                    setName(Musician.data.name);
                    setAge(Musician.data.age);
                    setGender(Musician.data.gender);
                    setInstrument(Musician.data.instrument);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить музыканта</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Введите возраст"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        placeholder="Введите пол"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control col-4"
                        id="instrument"
                        value={instrument}
                        onChange={(e) => setInstrument(e.target.value)}
                        placeholder="Введите название инструмента"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveMusician(e)}>
                        Сохранить
                    </button>
                    <Link to="/musicians" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку музыкантов</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateMusician;