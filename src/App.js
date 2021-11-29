import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Gallery from './pages/gallery';
export default React.memo(function App() {
  const [shift, setShift] = useState(sessionStorage.getItem('shift'));
  document.onscroll = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setShift(sessionStorage.getItem('shift'));
  }, [])
  return (
    <div className={`app${shift}`}>
      <Home />
      <h1 className='navSquare'>blank</h1>
      <h1 className='navSquare'>blank</h1>
      <h1 className='navSquare'>blank</h1>
      <Gallery shift={shift} setShift={setShift} />
      <Routes>
        <Route exact path='/' />
        <Route path='/gallery' />
      </Routes>
    </div>
  )
});