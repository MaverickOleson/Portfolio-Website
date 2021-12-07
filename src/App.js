import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Blog from './pages/blog';
import AboutMe from './pages/aboutMe';
import WorkExp from './pages/workExp';
import Gallery from './pages/gallery';

export default React.memo(function App() {
  const [shift, setShift] = useState(window.location.pathname.replace('/', ' '));
  document.onscroll = () => {
    window.scrollTo(0, 0);
  };
  // useEffect(() => {
  //   // alert('dsf')
  //   if (window.location.pathname === '/') {
  //     setShift('');
  //   }
  //   if (window.location.pathname === '/blog') {
  //     setShift(' blog');
  //   }
  //   if (window.location.pathname === '/aboutMe') {
  //     setShift(' aboutMe');
  //   }
  //   if (window.location.pathname === '/workExperience') {
  //     setShift(' workExp');
  //   }
  //   if (window.location.pathname === '/gallery') {
  //     setShift(' gallery');
  //   }
  // }, [])
  return (
    <div className={`app${shift}`}>
      <Home />
      <Blog setShift={setShift} />
      <AboutMe setShift={setShift} />
      <WorkExp setShift={setShift} />
      <Gallery setShift={setShift} />
      <Routes>
        <Route exact path='/' render={() => setShift('')} />
        <Route path='/blog' />
        <Route path='/gallery' />
      </Routes>
    </div>
  )
});