import React from "react";
import NotesItem from "./NotesItem";


const NotesList = (props) => {
    const { notes, removeItem, showItem } = props
    return (
        <div>
            {
                notes.length === 0 ? (
                    <div>
                        <p>No Notes found</p>
                        <p>Add your first note</p>
                    </div>
                ) : (
                    <div>
                        <h2>My Notes-{notes.length}</h2>
                        {
                            notes.map((note) => {
                                return <NotesItem
                                    key={note._id}
                                    {...note}
                                    removeItem={removeItem}
                                    showItem={showItem}
                                />
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default NotesList