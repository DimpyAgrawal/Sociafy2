import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import Home from './component/Home';
import Profile from './component/Profile';
import CreatePost from './component/CreatePost';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/createPost' element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
    
  );
}

export default App;
