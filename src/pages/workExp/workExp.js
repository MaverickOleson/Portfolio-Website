import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Work\nExp.');
        } else {
            setNavText('Home');
        }
        if (window.location.pathname === '/workExperience') {
            setRender(true);
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
                    navigation('/workExperience');
                    setShift(' shift3F');
                }
                else {
                    navigation('/');
                    setShift(' shift3B');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift3B') {
                            setRender(false);
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    'aklsjdfkajsdflkjasdklfjaslkdfj'
                    : ''
            }
        </div >
    )
});