import React, { useRef } from 'react';
import Home from './pages/home';
import Gallery from './pages/gallery';

export default function App() {
  return (
    <div>
      <Home />
      <Gallery />
      <h1>blank</h1>
      <h1>blank</h1>
      <h1>blank</h1>
      <h1 className='navSquare' id='square4' onClick={() => {
        document.getElementsByClassName('gallery')[0].classList.add('open')
      }}>blank</h1>
    </div >
  )
}
