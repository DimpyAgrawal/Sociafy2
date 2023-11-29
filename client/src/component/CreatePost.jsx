import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const notify1 = (msg) => toast.success(msg);
  const notify4 = (msg) => toast.error(msg);
  const notify2 = (msg) => toast.info(msg);
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const submitImage = async () => {
    try {
      if (!image) {
        notify4('Missing image, Upload again');
        return;
      }
      notify2('uploding your Post please wait...')
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'insta_clone');
      formData.append('cloud_name', 'dtjc6fasp');

      const response = await axios.post('https://api.cloudinary.com/v1_1/dtjc6fasp/image/upload', formData);

      console.log('Image uploaded successfully:', response.data.url);

      // Once the image is uploaded, you can proceed to create the post
      createPost(response.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const createPost = async (imageUrl) => {
    console.log(body+" "+imageUrl);
    try {
      if (!body || !imageUrl) {
        console.error('Missing required fields');
        return;
      }

      const response = await axios.post(
        'http://localhost:8080/post/posts',
        {
          body: body,
          photo: imageUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
        notify1("Post created successfully")
        navigate('/')
      console.log('Post created successfully:', response.data);

      setBody('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <div className="header1 relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center">
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Create New Post
            </h2>
            <p className="mt-2 text-sm text-gray-400">Post your Idea here...</p>
          </div>
          <div className="mt-8 space-y-3" >
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Write your message here...</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="text" placeholder="write a caption..." />
            </div>
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                    </div>
                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                  </div>
                  <input type="file" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              <span>File type: doc,pdf,types of images</span>
            </p>
            <div>
              <button onClick={submitImage} type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
