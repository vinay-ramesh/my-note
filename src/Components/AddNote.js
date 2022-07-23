import React, { useState } from "react";
import axios from "axios"
import NotesForm from "./NotesForm"

const AddNote = (props) => {
    const { addItem } = props
    const [isSaved, setIsSaved] = useState(false) // helps in clearing the id

    const formSubmit = (notes) => {
        //console.log("formSubmit", note)
        axios.post("http://dct-user-auth.herokuapp.com/api/notes", notes, {
            headers: {
                "x-auth": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                //console.log(result)
                addItem(result)
                setIsSaved(true)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    const togleIsSaved = () => {
        setIsSaved(false)
    }

    return (
        <div>
            <h2>Add Note</h2>
            <NotesForm formSubmit={formSubmit} isSaved={isSaved} togleIsSaved={togleIsSaved} />
        </div>
    )
}

export default AddNote