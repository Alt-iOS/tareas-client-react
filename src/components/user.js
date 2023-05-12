import React from 'react'
import { Button } from 'react-bootstrap';
import { useState } from "react";
import TareasUpdateForm from './tareasUpdateForm'

const User = ({ user, onDelete, onUpdate }) => {
    const [showForm, setShowForm] = useState(false)

    const clickTarea = () => {
        onDelete(user.id)
    }

    // Regreso de informcion dinamica 
    return (
        <div>
            <h5>{user.name}</h5>
            <h5>{`Id: ${user.id}`}</h5>
            <h5>{`Id: ${user._id}`}</h5>
            <h5>{`Email: ${user.email}`}</h5>
            <h5>{`Password: ${user.password}`}</h5>
            <Button variant="danger" onClick={clickTarea} className="deleteBtn">Delete</Button>
            <Button variant="primary" className="new-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close" : "Update info"}
            </Button>
            {showForm && <TareasUpdateForm onClickFn={onUpdate} oldTarea={user} ></TareasUpdateForm>}
            <hr></hr>
        </div>
    )
}

export default User;