import React from 'react'

export default function Post() {
  const loadfile=(event)=>{
    var loadFile = function(event) {
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(event.target.files[0]);
      output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
      }
    }
  }
  return (
    <>
      <div className='w-[100vw] h-[100vh]'>
        <div className='flex flex-col m-auto w-[50%]'>
          <div className=' flex'> 
            <p className='m-auto'>Create New Post</p>
            <button className='justify-end text-blue-500 font-semibold'>Share</button>
          </div>
          <hr />
          <div>
            <img src="" alt="" />
          <input type="file" accept="image/*" onchange="loadFile(event)"/>
          </div>
          <hr />

          <div className='flex'>
          <img className='rounded-full h-[11%px] mr-[10%]' src="https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1700438400&semt=sph" alt="" />
          <p>Ramesh</p>
          </div>
          <input type="textarea" />
        </div>
      </div>
       
      
    </>
  )
}
