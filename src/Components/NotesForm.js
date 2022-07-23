import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"

const NotesForm = (props) => {
    const { formSubmit, isSaved, togleIsSaved } = props
    const [id, setId] = useState(uuidv4())
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    useEffect(() => {
        if (isSaved) {
            setId(uuidv4())
            setTitle("")
            setBody("")
            togleIsSaved()
        }
    }, [isSaved])

    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else if (e.target.name === "body") {
            setBody(e.target.value)
        }
    }

    const runValidations = () => {
        if (title.trim().length === 0) {
            errors.title = "Title can't be blank"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                id: id,
                title: title,
                body: body
            }
            //console.log("Notes Form", formData)
            formSubmit(formData)
        } else {
            console.log("errors", errors)
            setFormErrors(errors)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={handleChange}
                    name="title"
                /> {formErrors.title && <span>{formErrors.title}</span>} <br />

                <input
                    type="body"
                    placeholder="Enter body"
                    value={body}
                    onChange={handleChange}
                    name="body"
                />

                <input type="submit" />
            </form>
        </div>
    )
}

export default NotesForm