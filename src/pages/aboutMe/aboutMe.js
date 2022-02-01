import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/slider';

export default React.memo(function AboutMe({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['I lovesssssssssssssssssssssssdssssssssssssssssI lovesssssssssssssssssssssssdssssssssssssssssI lovesssssssssssssssssssssssdssssssssssssssssI lovesssssssssssssssssssssssdssssssssssssssss', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('About\nMe');
        }
        if (window.location.pathname === '/aboutMe') {
            setNavText('Home');
            setRender(true);
        }
    });
    function switchPost() {
        var point = Math.round(pos);
        return posts[Math.floor(point / 100 * posts.length)] || posts[posts.length - 1];
    }
    return (
        <>
            <h1 className='navSquare' id="aboutMeNav" onPointerDown={() => {
                if (window.location.pathname === '/') {
                    navigation('/aboutMe');
                    setShift(' shift2F');
                    document.addEventListener('animationend', startAboutMe);
                    function startAboutMe(e) {
                        if (e.animationName === 'shift2F') {
                            setShift(' aboutMe');
                            document.removeEventListener('animationend', startAboutMe);
                        }
                    }
                }
                else {
                    navigation('/');
                    setShift(' shift2B');
                    document.addEventListener('animationend', endAboutMe);
                    function endAboutMe(e) {
                        if (e.animationName === 'shift2B') {
                            setRender(false);
                            document.removeEventListener('animationend', endAboutMe);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='aboutMe web-page'>
                        <Slider pos={pos} setPos={setPos} />
                        <div className='info'>
                            <p>{switchPost()[0]}</p>
                            <img />
                            <p>{switchPost()[1]}</p>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});