import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfilePic from './ProfilePic';

export default function Profile() {
    const [userData, setUserData] = useState(null); // Initialize userData with null or an initial value
    const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getProfiteData', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const user = response.data.user; // receiving data from the backend
            console.log(user);
            setUserData(user);
        } catch (error) {
            console.log('error in fetching user data: ', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [setUserData]);
    

    // for changing the profile pic;

    const[changePic,setChangePic] = useState(false);
    const changeProfile =() =>{
        if(changePic) setChangePic(false)
        else setChangePic(true)
    }
  

    return (
        <div>
            <div className='flex w-[100vw] h-[100vh]'>
                <div className='flex flex-col m-auto mt-[2%] w-[70%] h-[100vh]'>
                    <div className='flex  mx-auto pl-[11%] h-[30%] w-[80%]'>
                    <img
                        onClick={changeProfile}
                        className='rounded-full h-[200px] w-[200px] object-cover'
                        
                        src={userData && userData.photo ? userData.photo : "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph"}
                        alt="" 
                    /> {changePic && <ProfilePic changeProfile={changeProfile} />}

                         

                        <div className=' pl-[2%] my-auto' >
                            <h1 className='text-3xl font-semibold'>{userData ? userData.name : 'Dim'}</h1>
                            <div className=' flex pl-[2%] pt-[10%] '>

                                <p>{userData && userData.posts ? userData.posts.length : '0' } posts</p>
                                <p>
                                    {userData && userData.followers ? userData.followers.length : '0'} followers
                                </p>

                                <p> {userData && userData.following ? userData.following.length : '0'}  following</p>
                            </div>
                        </div>
                    </div>
                    <div className='font-bold mt-[2%]'><hr className='h-9 font-bold' /></div>

                    {/* lower part  */}

                    <div className='flex'>
                        <div className='m-[3%] '><img className='h-[25%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" /></div>
                        <div className='m-[3%] '><img className='h-[20%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" /></div>
                        <div className='m-[3%] '><img className='h-[20%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" /></div>


                    </div>
                    <div className='flex'>
                        <div className='m-[3%] '><img className='h-[25%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" /></div>
                        <div className='m-[3%] '><img className='h-[20%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" /></div>
                        <div className='m-[3%] '><img className='h-[20%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" /></div>


                    </div>
                </div>
            </div>
        </div>       
    )
}
