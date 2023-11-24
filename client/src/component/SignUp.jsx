import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from 'react-router-dom';

export default function SignUp() {

  const initialValue = {
    name: '',
    email: '',
    password: ''
  }
  const navigate = useNavigate()
  const [userData, setUserData] = useState(initialValue);
  const { name, email, password } = userData;
  const notify1 = () => toast.success("Account Created Successfully");
  const notify4 = (msg) => toast.error(msg);

  const onValueChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/register', userData)
      .then(response => {
        console.log(response.data);
        if (response.data.error) { notify4(response.data.error) }
        else notify1();
      })
      .catch(error => {
        console.log("error " + error);
      });
    navigate('/signin')
  }


  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-pink-500'>
        <div className=' flex m-auto w-[80%] '>
          <div className=' flex mt-[15%] m-auto w-[35%] bg-slate-300 rounded-lg shadow-lg'>
            <div className=' flex flex-col m-auto mt-2 '>

              <h3 className='font-bold mb-2'>Sign up</h3>

              <input type="text"  name="name" placeholder='Name' value={name} onChange={(e) => onValueChange(e)} /><br />
              <input type="email" id="email" name="email" placeholder='Email Address' value={email} onChange={(e) => onValueChange(e)} /><br />
              <input type="password" id="password" name="password" placeholder='Password' value={password} onChange={(e) => onValueChange(e)} /><br />
              <button onClick={(e) => handleSubmit(e)}>SignUp</button>
            </div>
          </div>
          <div className=' border-purple-900'>

          </div>
        </div>
      </div>
    </>
  )
}
