import React from "react";

const NotesItem = (props) => {
    const { _id, title, body, removeItem, showItem } = props
    return (
        <div>
            <h2>{title}</h2>
            <p>{body}</p>

            <button onClick={() => {
                removeItem(_id)
            }}>Remove</button>

            <button onClick={() => {
                showItem(_id)
            }}>Show</button>
        </div>
    )
}
export default NotesItem