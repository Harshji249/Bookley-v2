import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import './App.css'
import Landing from './pages/landing/Landing'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Add from './pages/addproduct/Add'
import Mybook from './pages/mybooks/Mybook';
import Team from './pages/team/Team';
import Chat from './pages/chat/Chat';
import Mydash from './pages/mydash/mydash';
import Protected from './ProtectedRtoutes';
import Bidding from './pages/bidding/Bidding';
import AllBid from './pages/allbid/AllBid';
import MyBidding from './pages/mybiddings/MyBidding';
import Messages from './pages/messages/Messages';
// import SenderState from './context/sender/SenderState';

function App() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });


  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Protected Components={<Landing />} />} />
          <Route path='/home' element={<Protected Components={<Home />} />} />
          <Route path='/addproduct' element={<Protected Components={<Add />} />} />
          <Route path='/mybooks' element={<Protected Components={<Mybook />} />} />
          <Route path='/chat' element={<Protected Components={<Chat />} />} />
          <Route path='/createbid' element={<Bidding/>} />
          <Route path='/bidding' element={<AllBid/>} />
          <Route path='/messages' element={<Messages/>} />
          <Route path='/team' element={<Protected Components={<Team />} />} />
          <Route path='/mybidding' element={<MyBidding />} />
          <Route path='/login' element={<Protected Components={<Login userDetails={userDetails} setUserDetails={setUserDetails} />} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
