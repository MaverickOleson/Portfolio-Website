import React, { useState, useEffect } from 'react';
import Home from './pages/home/home';
import Blog from './pages/blog/blog';
import AboutMe from './pages/aboutMe/aboutMe';
import WorkExp from './pages/workExp/workExp';
import Gallery from './pages/gallery/gallery';

export default React.memo(function App() {
  const [shift, setShift] = useState(window.location.pathname.replace('/', ' '));
  window.onpopstate = () => {
    setShift(window.location.pathname.replace('/', ' '));
  };
  window.onresize = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  window.addEventListener("keydown", function (e) {
    console.log(e)
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) > -1) {
      e.preventDefault();
    }
  }, false);
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