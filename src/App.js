import React, { useState, useEffect } from 'react';
import Home from './pages/home/home';
import Blog from './pages/blog/blog';
import AboutMe from './pages/aboutMe/aboutMe';
import Career from './pages/career/career';
import Gallery from './pages/gallery/gallery';

export default React.memo(function App() {
  const [shift, setShift] = useState(window.location.pathname.replace('/', ' '));
  window.addEventListener('popstate', () => {
    setShift(window.location.pathname.replace('/', ' '));
  });
  // makes going back a page take you to previous page
  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  });
  // vh value, dependant on device height, changed for css changed on resize
  window.addEventListener("deviceorientation", () => { document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`) });
  // vh value, dependant on device height, changed for css changed on orientation change
  window.addEventListener("keydown", (e) => {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);
  // prevents default action of certain keypresses
  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  })
  // vh value, dependant on device height, changed on rerender
  return (
    <div className={`app${shift}`}>
      <Home />
      <Blog setShift={setShift} />
      <AboutMe setShift={setShift} />
      <Career setShift={setShift} />
      <Gallery setShift={setShift} />
      {/* page components added */}
    </div>
  )
});