//require("dotenv").config()
import { useEffect, useState } from "react";
import Tarea from "./tarea";
import User from "./user";
import TareasForm from "./tareasForm"
import { Button } from 'react-bootstrap';


const TareasList = () => {


    const [user, setUser] = useState([]);
    const [showForm, setShowForm] = useState(false);

    // Hook para editar varibles de estado
    useEffect(() => {
        fetch("https://api-rest-batarseshija.azurewebsites.net/users")
            .then((res) => res.json())
            .then((data) => setUser(data.data))
            .catch((err) => console.log(`Error: ${err}`));
    }, []);

    const getTareas = () => {
        fetch("https://api-rest-batarseshija.azurewebsites.net/users")
            .then((res) => res.json())
            .then((data) => setUser(data.data))
            .then((err) => console.log(`Error: ${err}`));
    }

    const createTarea = (data) => {
        try {
            fetch("https://api-rest-batarseshija.azurewebsites.net/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(dataResponse => {
                    setUser([...user, dataResponse.data]);
                    setShowForm(false);
                });
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTarea = (data) => {
        try {
            fetch(`https://api-rest-batarseshija.azurewebsites.net/users/${data}`, {
                method: "DELETE"
            })
                .then(response => response.json())
                .then(dataResponse => {
                    console.log(dataResponse)
                    // setTareas([...tareas, dataResponse.data])
                })
                .then(() => {
                    getTareas()
                })
        } catch (err) {
            console.log(err)
        }
    }

    const updateTarea = (data) => {
        try {
            fetch(`https://api-rest-batarseshija.azurewebsites.net/users/${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(dataResponse => {
                    //setTareas(tareas.map(tarea => tarea.id === dataResponse.data.id ? dataResponse.data : tarea));
                    setShowForm(false);
                }).then(() => {
                    getTareas()
                });
        } catch (err) {
            console.log(err);
        }
    }

    // Regreso dinamico de informacion
    return (
        <div>
            {user.map((user, index) => (
                <User
                    key={index}
                    index={index}
                    user={user}
                    onDelete={deleteTarea}
                    onUpdate={updateTarea}
                />
            ))}
            <br></br>
            <Button variant="primary" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close" : "Create Homework"}
            </Button>
            {showForm && <TareasForm onClickFn={createTarea}></TareasForm>}
            <br></br>
        </div>
    )
}

export default TareasList;