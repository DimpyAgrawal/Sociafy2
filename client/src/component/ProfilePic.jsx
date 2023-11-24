import axios from 'axios';
import React, { useEffect, useState ,useRef} from 'react';


export default function ProfilePic({changeProfile}) {
  const [image, setImage] = useState('');
  const [url,setUrl] = useState(null);
  

  const submitImage = () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'insta_clone');
    formData.append('cloud_name', 'dtjc6fasp');

    axios.post('https://api.cloudinary.com/v1_1/dtjc6fasp/image/upload', formData)
      .then((response) => {
        console.log(response.data);
        // Perform any necessary actions after image upload
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(()=>{
    if(image)  submitImage();   //when image is available tbhi image will save in the cloudinary
  },[image]);  // mere according set image honi chahiye

  //jaise hi upload photo pe click ho input tag trigger ho jaye so we are making a function
  const hiddenFileInput = useRef(null);
  const handleClick = () =>{
    hiddenFileInput.current.click();
  }


  // make a function to save the image in the database

  const saveImageInDB =()=>{
    axios.put('http://localhost:8080/setImageToDB',{
        pic: url,
    },{
      headers:{
        "Content-Type" : "application/json",
        Authorization: "Bearer "+localStorage.getItem("jwt"),
      }
    }).then((response)=>{
      console.log(response.data);
      changeProfile();
      window.location.reload();  // used to refresh the page after uploading the profile image
    }).catch((error)=>{
      console.log('Error' , error);
    });
 
  };

  



  useEffect(()=>{
    if(url) saveImageInDB();
  },[url]);


  return (
    <>
      <div className='w-[100vw] h-[100vh] bg-gray-700 bg-opacity-70 top-0 left-0 fixed'>
        <div className='flex flex-col m-auto gap-y-3 bg-slate-50 w-[25%] mt-[20%] justify-center rounded-lg'>
          
          <input type='file' onChange={(e) => setImage(e.target.files[0])}  ref={hiddenFileInput} />
          {/* <button onClick={submitImage}>Upload</button> */}
          <button onClick={handleClick}>Upload</button>

          <button onClick={()=>{
            setUrl(null)
            submitImage();
          }}> Delete profile photo</button>
          <button onClick={changeProfile}> Cancel</button>
        </div>
      </div>
    </>
  );
}
