import axios from 'axios';
import React, { useState } from 'react'

export default function Post() {
  const[body,setBody] = useState('');
  const[image,setImage] = useState('');
  const loadFile=(event)=>{
    var loadFile = function(event) {
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
      }
    }
  }


  const submitImage = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'insta_clone');
    formData.append('cloud_name', 'dtjc6fasp');

    axios.post('https://api.cloudinary.com/v1_1/dtjc6fasp/image/upload', formData)
      .then((response) => {
        console.log(response.data.url);
        // Perform any necessary actions after image upload
        setUrl(response.data.url);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
    
      <div className='flex flex-col m-auto w-[20%] mt-1 border-2 dark:bg-gray-700'>
        <div className='flex justify-around'>
          <div className='font-bold'>Create New Post</div>
          <button className='flex ml-0 text-end text-blue-500 font-semibold' onClick={submitImage}>Share</button>
        </div>
        <hr className="my-8 mt-2 mb-2 bg-gray-200 border-2 dark:bg-gray-700" />
        <div>
          <img id='output' className='m-auto h-56' src='https://static.thenounproject.com/png/12634-200.png' alt="Preview" />
          <input type="file" onChange={loadFile} />
        </div>
        <hr className="my-8 mt-2 mb-2 bg-gray-200 border-2 dark:bg-gray-700" />
        <div className='flex'>
          <div className='flex h-7 mb-3 mr-4 ml-1'><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80" className='rounded-full' alt="" /></div>
          <div><p>Anupam</p></div>
        </div>
        <div><textarea value={body} onChange={(e) => setBody(e.target.value)} type="text" placeholder='write a caption...' /></div>
      </div>
       
      
    </>
  )
}
