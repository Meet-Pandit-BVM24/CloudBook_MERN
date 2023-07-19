import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Note from './Note';

export default function ViewNotes(props) {

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    const navigate = useNavigate()

    if (!localStorage.getItem('token')) {
        props.showAlert("You Need to Login First.", "danger")
        navigate('/login')
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    const ViewNote = async (e) => {
        e.preventDefault();

        try {
            const url = "http://localhost:5000/api/notes/fetchallnotes"
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": JSON.parse(localStorage.getItem('token'))
                }
            });

            const resjson = await response.json();
            console.log(resjson);
            setNotes(resjson.notes);

            if (resjson.success) {
                { resjson.notes.length === 0 ? props.showAlert("No Notes Availble.Add Notes to See them here", "success") : props.showAlert("Note Fetched Successfully", "success") }
            }
            else {
                props.showAlert("Fail to Find Your Notes.", "danger")
            }
        }
        catch (err) {
            console.log(err)
            props.showAlert("Internal Server Error.Try to View after Some time", "danger")
            navigate('/')
        }
    }
    const deleteNote = async (id) => {

        try {

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
            props.showAlert("Deleted Successfully", "success")
        } catch (error) {
            props.showAlert("Error in Deleting Note.Try after Some Time!!!.", "danger")
        }
    }

    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": JSON.parse(localStorage.getItem('token'))
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    
    return (
        <div>
            <div className="container">

                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className="my-3">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="tag" className="form-label">Tag</label>
                                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                    </div>

                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <button className='btn btn-primary my-5' onClick={ViewNote}>View all notes</button>
            </div>
            <div className="row my-3">
                {notes.length === 0 && 'No Notes to Display'}
                {notes.map((note) => {
                    return <Note key={note._id} note={note} deleteNote={deleteNote} updateNote={updateNote} />
                })
                }
            </div>
        </div>
    )
}
