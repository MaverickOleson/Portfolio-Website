import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import Gallery from './pages/gallery';
export default function App() {
  const navigation = useNavigate();
  const [navSquare1, setNavSquare1] = useState('Gallery');
  const [navSquare2, setNavSquare2] = useState('Gallery');
  const [navSquare3, setNavSquare3] = useState('Gallery');
  const [navSquare4, setNavSquare4] = useState('Gallery');
  useEffect(() => {
    document.getElementsByClassName('navSquare')[3].style.zIndex = '1';
  }, [])
  return (
    <div className="app">
      <h1 className='navSquare'>blank</h1>
      <h1 className='navSquare'>blank</h1>
      <h1 className='navSquare'>blank</h1>
      <h1 className='navSquare' onClick={() => {
        setTimeout(() => {
          navigation('/gallery');
        }, 500)
        document.getElementsByClassName('gallery')[0].style.animation = 'gallery-open 0.5s forwards';
        setNavSquare4('Home');
      }}>Gallery</h1>
      <Routes>
        <Route exact path='/' element={[<Home />, <Gallery state='closed' />]} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </div>
  )
}
