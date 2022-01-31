import React, { useEffect, useState, useRef } from 'react';
import artGall from '../../images/artGallerySmall.jpg';
import synth from '../../images/synthSmall.jpg';
import oldPortfolio from '../../images/oldPortfolio.jpg';
import storeApi from '../../images/storeAPI.jpg';
import pokedex from '../../images/Pokedex.jpg';
import codingPage from '../../images/codingPage.jpg';
import chess from '../../images/chess.jpg';
import venomPage from '../../images/venomPage.jpg';
import menu from '../../images/menu.jpg'
import hummus from '../../images/hummus.jpg';
import navbar from '../../images/navbar.jpg';
import pizzaPage from '../../images/pizzaPage.jpg';
import qAndA from '../../images/QandA.jpg';
import reviews from '../../images/reviews.jpg'
import counter from '../../images/reactCount.jpg';
import tours from '../../images/tours.jpg';
import sassLink from '../../images/sassLink.jpg';
import { useNavigate } from 'react-router-dom';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [imgSrcs, setImgSrcs] = useState([artGall, synth, oldPortfolio, codingPage, chess, pokedex, venomPage, storeApi, hummus, menu, navbar, pizzaPage, qAndA, reviews, counter, tours, sassLink]);
    const img1 = useRef();
    const img2 = useRef();
    const img3 = useRef();
    const img4 = useRef();
    const img5 = useRef();
    const img6 = useRef();
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Gallery');
        } else {
            setNavText('Home');
        }
        //check all useeffects
        if (window.location.pathname === '/gallery') {
            setRender(true);
        }
    })
    return (
        <>
            <h1 className='navSquare' id="galleryNav" onClick={() => {
                if (window.location.pathname === '/') {
                    navigation('/gallery');
                    setShift(' shift4F');
                    // document.addEventListener('animationend', startBlog);
                    // function startBlog(e) {
                    //     if (e.animationName === 'shift4F') {
                    //         setRender(true);
                    //         document.removeEventListener('animationend', startBlog);
                    //     }
                    // }
                }
                else {
                    navigation('/');
                    setShift(' shift4B');
                    // document.addEventListener('animationend', startBlog);
                    // function startBlog(e) {
                    //     if (e.animationName === 'shift4B') {
                    //         setRender(false);
                    //         document.removeEventListener('animationend', startBlog);
                    //     }
                    // }
                }
                // document.getElementsByClassName('gallery')[0].style.animation = 'gallery-open 0.5s forwards';
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='gallery web-page'>
                        <div className='img-orbit'>
                            <img ref={img1} src={imgSrcs[6]} />
                            <img ref={img2} src={imgSrcs[5]} />
                            <img ref={img3} src={imgSrcs[4]} />
                            <img ref={img4} src={imgSrcs[3]} />
                            <img ref={img5} src={imgSrcs[2]} />
                            <img ref={img6} src={imgSrcs[1]} />
                            <img src={imgSrcs[0]} className='current' />
                            <div className='orbiters'>
                                <ImArrowLeft onClick={() => {
                                    document.addEventListener('animationend', orbit);
                                    function orbit(e) {
                                        if (e.animationName === 'rotateB4') {
                                            img2.current.classList.remove('rotateB1');
                                            img3.current.classList.remove('rotateB2');
                                            img4.current.classList.remove('rotateB3');
                                            img5.current.classList.remove('rotateB4');
                                            document.removeEventListener('animationend', orbit);
                                        }
                                    }
                                    const movedImg = imgSrcs[imgSrcs.length - 1];
                                    setImgSrcs([movedImg, ...(imgSrcs.slice(0, imgSrcs.length - 1))]);
                                    img2.current.classList.add('rotateB1');
                                    img3.current.classList.add('rotateB2');
                                    img4.current.classList.add('rotateB3');
                                    img5.current.classList.add('rotateB4');
                                }} />
                                <h1>{'Stuff'}</h1>
                                <ImArrowRight onClick={() => {
                                    document.addEventListener('animationend', orbit);
                                    function orbit(e) {
                                        if (e.animationName === 'rotateF4') {
                                            const movedImg = imgSrcs[0];
                                            setImgSrcs([...(imgSrcs.slice(1, imgSrcs.length)), movedImg]);
                                            img6.current.classList.remove('disappear');
                                            img2.current.classList.remove('rotateF1');
                                            img3.current.classList.remove('rotateF2');
                                            img4.current.classList.remove('rotateF3');
                                            img5.current.classList.remove('rotateF4');
                                            document.removeEventListener('animationend', orbit);
                                        }
                                    }
                                    img6.current.classList.add('disappear');
                                    img2.current.classList.add('rotateF1');
                                    img3.current.classList.add('rotateF2');
                                    img4.current.classList.add('rotateF3');
                                    img5.current.classList.add('rotateF4');
                                }} />
                            </div>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});