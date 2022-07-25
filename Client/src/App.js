
import './App.css';
import { useEffect, useState } from 'react'
import React from 'react';
import axios from 'axios'
import Todo from './Components/Todos/Todo';
import Navbar from './Components/Header/Navbar';
import Loader from './Components/Loader/Loader';
import LoginSignUp from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './Components/Profile/Profile';
import EditAbleProfile from './Components/Profile/EditAbleProfile';
import ChangePassword from './Components/Profile/ChangePassword';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  const getAccount = async () => {
    setLoading(true)
    const config = { headers: { "Content-Type": "application/json" } };
    await axios.get(
      `/api/profile`,
      config
    ).then((res) => {
      setLoggedIn(true);
      setUser(res.data.user);
      console.log(res.data)
    })
      .catch((err) => setLoggedIn(false))
    setLoading(false)
  }

  useEffect(() => {
    getAccount()
  }, [])

  return (

    <Router>
      <>
        {loading && <Loader />}
        {loggedIn && (
          <>

            <Navbar />
            <Routes>

              <Route exact path="/" element={<Todo />} />
              <Route exact path="/profile" element={<Profile user={user} />} />
              <Route exact path="/profile/updateProfile" element={<EditAbleProfile oldUser={user} />} />
              <Route exact path="/profile/changePassword" element={<ChangePassword  />} />
            </Routes>

          </>
        )}
        {!loggedIn && <LoginSignUp />}
      </>
    </Router>
  );
}

export default App;
