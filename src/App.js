import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import React, { useState } from 'react';
import Alert from './components/Alert';
import CreateNote from './components/CreateNote';
import ViewNotes from './components/ViewNotes';
// eslint-disable-next-line

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  } 
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <div className="container">


          <Routes>
            <Route exact path="/" element={<Home  showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/create" element={<CreateNote showAlert={showAlert} />} />
            <Route exact path="/view" element={<ViewNotes showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
