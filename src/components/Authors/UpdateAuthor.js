import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import authorsService from "../../services/authors.service";

const UpdateAuthor = () => {

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [countryDirty, setCountrDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [countryError, setCountryError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');

    const history = useHistory();

    let { id } = useParams();

    const saveAuthor = (e) => {
        e.preventDefault();

        const author = { name, country, gender, id };

        //update
        authorsService.update(author)
            .then(response => {
                console.log('Author updated', response.data);
                history.push('/authors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    useEffect(() => {
        if (id) {
            authorsService.get(id)
                .then(author => {
                    setName(author.data.name);
                    setCountry(author.data.country);
                    setGender(author.data.gender);
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
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Введите название страны"
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
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                        onClick={(e) => saveAuthor(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку авторов</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateAuthor;