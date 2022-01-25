import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/slider';

export default React.memo(function AboutMe({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('About\nMe');
        } else {
            setNavText('Home');
        }
        if (window.location.pathname === '/aboutMe') {
            setRender(true);
        }
    });
    function switchPost() {
        var point = Math.round(pos);
        return posts[Math.floor(point / 100 * posts.length)] || posts[posts.length - 1];
    }
    return (
        <>
            <h1 className='navSquare' id="aboutMeNav" onClick={() => {
                if (window.location.pathname === '/') {
                    navigation('/aboutMe');
                    setShift(' shift2F');
                }
                else {
                    navigation('/');
                    setShift(' shift2B');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift2B') {
                            setRender(false);
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='aboutMe web-page'>

                        <div className='info'>
                            <p>{switchPost()[0]}</p>
                            <img />
                            <p>{switchPost()[1]}</p>
                        </div>
                        <Slider pos={pos} setPos={setPos} />
                    </div >
                    : ''
            }
        </>
    )
});