import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from '../contexts/UserContext';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import SignUp from './Signup/SignUp';

export default function App() {
  const [userData, setUserData] = useState(null);

  <BrowserRouter>
    <UserContext.Provider value={{ userData, setUserData }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </UserContext.Provider>
  </BrowserRouter>;
}
