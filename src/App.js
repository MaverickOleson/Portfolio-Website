import React, { useState, useEffect } from 'react';
import Home from './pages/home';
import Blog from './pages/blog';
import AboutMe from './pages/aboutMe';
import WorkExp from './pages/workExp';
import Gallery from './pages/gallery';

export default React.memo(function App() {
  const [shift, setShift] = useState(window.location.pathname.replace('/', ' '));
  window.onpopstate = () => {
    setShift(window.location.pathname.replace('/', ' '))
  };
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  return (
    <div className={`app${shift}`}>
      <Home />
      <Blog setShift={setShift} />
      <AboutMe setShift={setShift} />
      <WorkExp setShift={setShift} />
      <Gallery setShift={setShift} />
    </div>
  )
});