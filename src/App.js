import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Blog from './pages/blog';
import Gallery from './pages/gallery';

export default React.memo(function App() {
  const [shift, setShift] = useState('');
  document.onscroll = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    if (window.location.pathname == '/gallery') {
      setShift(' gallery');
    }
    if (window.location.pathname == '/blog') {
      setShift(' blog');
    }
  }, [])
  return (
    <div className={`app${shift}`}>
      <Home />
      <h1 className='navSquare'>blank</h1>
      <Blog shift={shift} setShift={setShift} />
      <h1 className='navSquare'>blank</h1>
      <Gallery shift={shift} setShift={setShift} />
      <Routes>
        <Route exact path='/' />
        <Route path='/gallery' />
      </Routes>
    </div>
  )
});