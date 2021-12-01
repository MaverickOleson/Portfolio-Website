import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/slider';

export default React.memo(function Blog({ setShift }) {
    const navigation = useNavigate();
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Blog');
        } else {
            setNavText('Home');
        }
    });
    function switchPost() {
        var point = Math.round(pos);
        return posts[Math.floor(point / 100 * posts.length)] || posts[posts.length - 1];
    }
    return (
        <div className='aboutMe web-page'>
            <h1 className='navSquare' onClick={() => {
                if (window.location.pathname === '/') {
                    setShift(' shift2F');
                    setTimeout(() => {
                        navigation('/aboutMe');
                    }, 500);
                }
                else {
                    setShift(' shift2B');
                    setTimeout(() => {
                        navigation('/');
                    }, 500);
                }
            }}>{navText}</h1>
            <div className='info'>
                <p>{switchPost()[0]}</p>
                <img />
                <p>{switchPost()[1]}</p>
            </div>
            <Slider pos={pos} setPos={setPos} />
        </div >
    )
});