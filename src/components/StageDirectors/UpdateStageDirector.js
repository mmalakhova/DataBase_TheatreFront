import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import stageDirectorsService from "../../services/stageDirectors.service";
const UpdateStageDirector = () => {

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

    const saveAuthor = (e) => {
        e.preventDefault();

        const stageDirector = { name, type, gender, age, id };

        //update
        stageDirectorsService.update(author)
            .then(response => {
                console.log('Author updated', response.data);
                history.push('/stagedirectors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    useEffect(() => {
        if (id) {
            stageDirectorsService.get(id)
                .then(author => {
                    setName(author.data.name);
                    setType(author.data.type);
                    setGender(author.data.gender);
                    setAge(author.data.age);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить автора</h3>
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
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        placeholder="Введите тип постановщика"
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
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Введите возвраст"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveStageDirector(e)}>
                        Сохранить
                    </button>
                    <Link to="/stagedirectors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку постановщиков</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateStageDirector;