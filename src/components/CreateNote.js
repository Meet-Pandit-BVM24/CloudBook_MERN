import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function CreateNote(props) {
    
    const navigate = useNavigate()
    
    if (!localStorage.getItem('token')) {
        props.showAlert("You Need to Login First.", "danger")
        navigate('/login')
    }
    const [data, setData] = useState({ title: "", description: "", tag: "" })
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }


    const AddNote = async (e) => {
        e.preventDefault();
        
        try {
            const url = "https://cloud-book-backend-xi.vercel.app/api/notes/addnote"
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": JSON.parse(localStorage.getItem('token'))
                },
                body: JSON.stringify({ title: data.title, description: data.description, tag: data.tag }), // body data type must match "Content-Type" header
            });

            const resjson = await response.json();
            console.log(resjson);

            if (resjson.success) {
                
                props.showAlert("Note Created Successfully", "success")
                setData({ title: "", description: "", tag: "" })
            }
            else {
                props.showAlert("Fail to add Your Note.", "danger")
            }
        }
        catch (err) {
            console.log(err)
            props.showAlert("Internal Server Error.Try after Some time", "danger")
            navigate('/')
        }

    }
    return (
        <div className='container CreateNote'>
            <form onSubmit={AddNote}>
                <div className="form-outline mb-4 ">
                    <input type="text" value={data.title} id="title" name='title' onChange={onChange} placeholder='title' className="form-control" minLength={3} required />
                </div>

                <div className="form-outline mb-4 ">
                    <input type="text" value={data.description} id="description" name='description' onChange={onChange} placeholder='description' minLength={5} className="form-control" required />
                </div>

                <div className="form-outline mb-4 ">
                    <input type="text" value={data.tag} id="tag" name='tag' onChange={onChange} placeholder='tag' className="form-control" required />
                </div>

                <div className="text-center">
                    <input type='submit' className="btn btn-primary" value="Add My Note" />
                </div>

            </form>
        </div>
    )
}
