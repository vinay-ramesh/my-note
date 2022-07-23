import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import AddNote from "./AddNote";
import NotesList from "./NotesList";


const NoteContainer = (props) => {
    const [notes, setNotes] = useState([])

    const addItem = (note) => {
        setNotes([...notes, note])
    }

    useEffect(() => {
        axios.get("http://dct-user-auth.herokuapp.com/api/notes", {
            headers: {
                "x-auth": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                // console.log(result)
                setNotes(result)
            })
            .catch((error) => {
                alert(error.message)
            })
    }, [])

    const removeItem = (id) => {
        const confirmDelete = window.confirm("Are you sure??")
        if (confirmDelete) {
            axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
                headers: {
                    "x-auth": localStorage.getItem("token")
                }
            })
                .then((response) => {
                    const result = response.data
                    if (result.hasOwnProperty("errors")) {
                        alert(result.errors)
                    } else {
                        deleteNote(result._id)
                    }
                })
                .catch(err => alert(err.message))
        }
    }

    const deleteNote = (id) => {
        const result = notes.filter((ele) => {
            return ele._id !== id
        })
        setNotes(result)
    }

    const showItem = (id) => {
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
            headers: {
                "x-auth": localStorage.getItem("token")
            }
        })
            .then((response) => {
                const result = response.data
                // console.log(result)
                if (result.hasOwnProperty("errors")) {
                    alert(result.errors)
                } else {
                    swal(`title - ${result.title}  
                        body - ${result.body}`)
                }
            })
            .catch(err => alert(err.message))
    }

    return (
        <div>
            <NotesList notes={notes} removeItem={removeItem} showItem={showItem} />
            <AddNote notes={notes} addItem={addItem} />
        </div>
    )
}

export default NoteContainer