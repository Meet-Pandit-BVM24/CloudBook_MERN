import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {


  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate()

  const HandleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "https://cloud-book-backend-xi.vercel.app/api/auth/createuser"
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password }), // body data type must match "Content-Type" header
      });

      const resjson = await response.json();
      console.log(resjson);

      if (resjson.success) {
        var ResponseToken = resjson.authToken;
        localStorage.setItem('token', JSON.stringify(ResponseToken))

        navigate("/")
        props.showAlert("Created Successfully", "success")
      }
      else {
        props.showAlert("Fail to Create an account.Try With Different Email!!", "danger")
      }
    }
    catch (err) {
      props.showAlert("Internal Server Error", "danger")
    }
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container LoginForm">
        <form onSubmit={HandleSignUpSubmit}>
          <div className="form-outline mb-4">
            <input type="text" value={data.name} id="name" name='name' onChange={onChange} placeholder='Full Name' className="form-control" minLength={3} required />
          </div>

          <div className="form-outline mb-4">
            <input type="email" value={data.email} id="email" name='email' onChange={onChange} placeholder='Email address' className="form-control" required />
          </div>

          <div className="form-outline mb-4">
            <input type="password" value={data.password} id="password" name='password' onChange={onChange} placeholder='Password' className="form-control" minLength={5} required />
          </div>

          <div className="text-center">
            <input type='submit' className="btn btn-primary" value="Sign Up" />
          </div>

        </form>
      </div>
    </>
  )
}
