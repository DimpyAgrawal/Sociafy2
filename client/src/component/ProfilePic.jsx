import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProfilePic({ changeProfile }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const notify1 = () => toast.success("Photo uploaded successfully");
  const notify2 = (msg) => toast.info(msg);
  const notify4 = (msg) => toast.error(msg);

  const submitImage = () => {
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'insta_clone');
      formData.append('cloud_name', 'dtjc6fasp');

      notify2('Image is Uploading Please Wait...')
      
      axios.post('https://api.cloudinary.com/v1_1/dtjc6fasp/image/upload', formData)
        .then((response) => {
          console.log(response.data.url);
          setUrl(response.data.url);
          saveImageInDB(response.data.url);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      notify4('Please select an image before uploading.');
    }
  };

  const saveImageInDB = (imageUrl) => {
    axios.put('http://localhost:8080/setImageToDB', {
      pic: imageUrl,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }).then((response) => {
      console.log(response.data);
      changeProfile();
      localStorage.setItem('Photo',response.data.Photo)
      notify1();
      window.location.reload();
    }).catch((error) => {
      console.log('Error', error);
    });
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  }

  return (
    <>
      <div className='w-full h-[200vh] bg-gray-700 bg-opacity-70 top-0 left-0 fixed'>
        <div className='flex flex-col m-auto gap-y-3 bg-slate-50 w-[85%]  mt-[10%] justify-center rounded-lg'>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type='file' onChange={(e) => setImage(e.target.files[0])} className="hidden" ref={hiddenFileInput} />
            </label>
          </div>

          <button onClick={submitImage} 
            className='w-[90%] ml-[4%] text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >Upload </button>

          <button onClick={() => {
            setUrl(null);
            setImage(null);
          }} 
          className="w-[90%] ml-[4%] text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          > Delete profile photo</button>

          <button 
          className="w-[90%] ml-[4%] text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={changeProfile}> Cancel</button>
        </div>
      </div>
    </>
  );
}
