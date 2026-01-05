import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Inputs from './pages/Inputs';
import Recommendations from './pages/Recommendations';
import About from './pages/About';
import Guide from './pages/Guide';
import Header from './components/Header';
import Footer from './components/Footer';
import TestComponent from './pages/TestComponent';


function App() {
  return (
<>
      <Header/>
        <div className='app'>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route index element={<Home/>}/>
              <Route path='about' element={<About/>}/>
              <Route path='guide' element={<Guide/>}/>
              <Route path='inputs' element={<Inputs/>}/>
              <Route path='recommendations' element={<Recommendations/>}/>
<Route path='test' element={<TestComponent/>}/>

            </Routes>
          </BrowserRouter>
        </div>
      <Footer/>  
</>
    
  )
}

export default App


