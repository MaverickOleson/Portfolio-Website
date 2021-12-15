import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Work\nExp.');
        } else {
            setNavText('Home');
        }
    });
    function switchPost() {
        var point = Math.round(pos);
        return posts[Math.floor(point / 100 * posts.length)] || posts[posts.length - 1];
    }
    return (
        <div className='workExperience web-page'>
            <h1 className='navSquare' onClick={() => {
                if (window.location.pathname === '/') {
                    setShift(' shift3F');
                    setTimeout(() => {
                        navigation('/workExperience');
                    }, 500);
                }
                else {
                    setShift(' shift3B');
                    setTimeout(() => {
                        navigation('/');
                    }, 500);
                }
            }}>{navText}</h1>
            aklsjdfkajsdflkjasdklfjaslkdfj
        </div >
    )
});