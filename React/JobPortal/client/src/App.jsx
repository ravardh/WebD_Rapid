import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";


const App = () => {
  return (
    <>
      <BrowserRouter>
          <Navbar />      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/jobs" element={<Jobs/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
        
      </BrowserRouter>
    </>
  );
};

export default App;