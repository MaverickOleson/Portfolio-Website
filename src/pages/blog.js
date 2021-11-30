import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/slider';

export default React.memo(function Blog({ shift, setShift }) {
    const navigation = useNavigate();
    const [navText, setNavText] = useState();
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Blog')
        } else {
            setNavText('Home')
        }
    })
    return (
        <div className='blog web-page'>
            <h1 className='navSquare' onClick={() => {
                if (window.location.pathname === '/') {
                    setShift(' shift2F');
                    setTimeout(() => {
                        navigation('/blog');
                    }, 500);
                }
                else {
                    setShift(' shift2B');
                    setTimeout(() => {
                        navigation('/');
                    }, 500);
                }
            }}>{navText}</h1>
            <Slider />
        </div >
    )
});