import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Guide from './pages/Guide';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Contact from './pages/Contact';
import RecommendationForm from './pages/RecommendationForm';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="guide" element={<Guide />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="recommendation-form" element={<RecommendationForm />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
