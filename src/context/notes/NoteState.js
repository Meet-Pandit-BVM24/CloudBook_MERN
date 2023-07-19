import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": JSON.parse(localStorage.getItem('token'))
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={""}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;