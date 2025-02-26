
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';

import Profile from './components/Profile';
import { AuthProvider } from './context/AuthProvider';
import RequiredAuth from './components/RequiredAuth';
// import Register from './components/Register';


function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home Page */}
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="/profile"  element={<RequiredAuth><Profile /></RequiredAuth>}/>
          {/* <Route path="register" element={<Register />} /> */}
      
        </Route>
    </Routes>
  </AuthProvider>
  );
}

export default App;
