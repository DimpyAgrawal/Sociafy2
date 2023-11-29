import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const isLogin = localStorage.getItem('loggedIn')
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(isLogin);
  },[isLogin])
  return (
    <>
     
      <nav className="bg-white border-gray-200 dfgfdgmnfdnmbg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrapcursor-pointer ">SOCIAFY</span>
          </a>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dfgfdgmnfdnmbg-gray-800 md:dfgfdgmnfdnmbg-gray-900 dfgfdgmnfdnmborder-gray-700">
              {isLogin === "true" ?
                <>
                  <li>
                    <a className="hover:text-blue-600 cursor-pointer">
                      <NavLink to='/'><div>Home</div></NavLink>
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-blue-600 cursor-pointer"><NavLink to='/createPost'><div>Create Post</div></NavLink></a>
                  </li>

                  <li>
                    <a className="hover:text-blue-600 cursor-pointer"><NavLink to='/profile'><div>Profile</div></NavLink></a>
                  </li>

                  <li>
                    <div className="hover:text-blue-600 cursor-pointer"><div onClick = {()=>{localStorage.clear(); navigate('/signin')}}>Logout</div></div>
                  </li>
                </>
                :
                <>
                  <li>
                    <a className="hover:text-blue-600 cursor-pointer"><NavLink to='/signin'><div>SignIn</div></NavLink></a>
                  </li>

                  <li>
                    <a className="hover:text-blue-600 cursor-pointer"><NavLink to='/signup'><div>SignUp</div></NavLink></a>
                  </li>
                </>
              }


            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}
