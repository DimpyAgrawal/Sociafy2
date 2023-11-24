import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';




export default function SignIn() {

  const initialValue ={
    email: '',
    password: ''
    
  }
  const navigate = useNavigate();
  const[userData,setUserData] = useState(initialValue);
  const{email,password} = userData;
  const notify1 = () => toast.success("Account login successfully");
  const notify4 = (msg) => toast.error(msg);


   const onValueChange = (e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
   }

   const handleSubmit =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8080/loginUser',userData)
    .then(response =>{
      console.log("response" + JSON.stringify(response.data));
      const {email, id, photo} = jwt_decode(response.data.data);

      localStorage.setItem('token',JSON.stringify(response.data.data))
      console.log(email);
      console.log(id);
      console.log(photo);

      localStorage.setItem('id',id)
      localStorage.setItem('email',email)
      localStorage.setItem('loggedIn',true)
      localStorage.setItem('photo',photo)
      if(response.data.error){notify4(response.data.error)}

      else notify1();
    }).catch(error=>{
      console.log("error"+error);
    })
    navigate('/home')
   }
  return (
    <>
      <div className='w-[99vw] h-[91vh] bg-pink-500 rounded-lg'>
        <div className=' flex m-auto w-[80%] h-[80%] pt-[5%]'>
            <div className='bg-purple-950 w-[40%] text-white rounded-lg shadow-lg'>
                <h1 className='mx-[40%] mt-[40%]'>Welcome Page</h1>
                <p className='mx-[38%] mt-[35%] cursor-pointer'>Sign in to continue access</p>
            </div>
            <div className='bg-slate-300 w-[60%] rounded-lg shadow-lg'>
              
                <h3 className='font-bold mx-[43%] mt-[20%] mb-5 text-2xl'>Sign in</h3>
                <input className='mx-[43%]' type="email" id="email" name="email" placeholder='Email Address' onChange={(e)=> onValueChange(e)}/><br/><br/>
                <input className='mx-[43%]' type="password" id="password" name="password" placeholder='Password' onChange={(e)=> onValueChange(e)}/><br/><br/>
                <button className='mx-[43%] font-semibold' onClick={(e)=> handleSubmit(e)}>CONTINUE</button>
             
            </div>
        </div>
      </div>
    </>
  )
}
