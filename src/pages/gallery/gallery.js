import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [imgSrcs, setImgSrcs] = useState([[artGall, 'This is my Gallery website. I was most proud of the animations for the images I did and the aesthetic. It was done in React as a component project.'], [synth, 'This is my react synthesizer. After researching the documentation, I made a, what I might call, advanced utilization of the web audio api.'], [oldPortfolio, "This is my old portfolio website. I was prett happy with the aesthetic, although I didn't like the font, and I was especially proud of the spinning 3d pyramid I made using 3d css."], [codingPage, "This is my west-mec coding page, made for my coding class. This was just meant to be a practice run of what I knew at the time."], [chess, "This one is, well, I'm sure you've guessed. It's chess. I started this very early when I begain learning coding. It gave me a much deeper understanding of javascript and the html dom. It's unfinished but still has a lot of functionality."], [pokedex, "This is a pokedex web page, done as a practice of my understanding of web apis, and given from my coding teacher."], [venomPage, "This is a group project I did for childhood toys. I mainly worked on the Venom action figure page. I thought my part of the aesthetic was done very well."], [storeApi, "This is my MongoDB store api. I pull from info in the mongoDB database, and it generates a store done in Nodejs. I also uploaded this on Heroku."], [hummus, "This is an early webpage for a Hummus recipe, done as a test of my web design knowledge at the time."], [menu, "This is a menu that I had to create as a duplicate to my coding teacher's menu page."], [navbar, "This is a simple react navbar, meant to be fully scaleable."], [pizzaPage, "This is an early pizza page I made, which tested my knowledge of web design and forms"], [qAndA, "This is a q and a page I made."], [reviews, "This is a duplicate page to my coding teacher's page that he had me do. It's a review page."], [counter, "This is the first React project I did... a simple counter using usestate, based on a tutorial"], [tours, "This is a tours page and, is a duplicate to a page my teacher made."], [sassLink, "This was the first CLI command npm package I published, called sassLink. It's meant to look for sass partials in your folder and compile them into css."]]);
    const img1 = useRef();
    const img2 = useRef();
    const img3 = useRef();
    const img4 = useRef();
    const img5 = useRef();
    const img6 = useRef();
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Gallery');
        }
        if (window.location.pathname === '/gallery') {
            setNavText('Home');
            setRender(true);
        }
    })
    return (
        <>
            <h1 className='navSquare' id="galleryNav" onPointerDown={() => {
                if (window.location.pathname === '/') {
                    navigation('/gallery');
                    setShift(' shift4F');
                    document.addEventListener('animationend', startGallery);
                    function startGallery(e) {
                        if (e.animationName === 'shift4F') {
                            setShift(' gallery');
                            // setRender(true);
                            document.removeEventListener('animationend', startGallery);
                        }
                    }
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
                            <img ref={img1} className='satel' src={imgSrcs[6][0]} />
                            <img ref={img2} className='satel' src={imgSrcs[5][0]} />
                            <img ref={img3} className='satel' src={imgSrcs[4][0]} />
                            <img ref={img4} className='satel' src={imgSrcs[3][0]} />
                            <img ref={img5} className='satel' src={imgSrcs[2][0]} />
                            <img ref={img6} className='satel' src={imgSrcs[1][0]} />
                            <img src={imgSrcs[0][0]} className='current' />
                            <div className='orbiters'>
                                <div className='orbitArrow' onPointerDown={() => {
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
                                    const newImgSrcs = [movedImg, ...(imgSrcs.slice(0, imgSrcs.length - 1))];
                                    setImgSrcs(newImgSrcs);
                                    img2.current.classList.add('rotateB1');
                                    img3.current.classList.add('rotateB2');
                                    img4.current.classList.add('rotateB3');
                                    img5.current.classList.add('rotateB4');
                                }} />
                                <div className='orbitArrow' onPointerDown={() => {
                                    document.addEventListener('animationend', orbit);
                                    function orbit(e) {
                                        if (e.animationName === 'rotateF4') {
                                            const movedImg = imgSrcs[0];
                                            const newImgSrcs = [...(imgSrcs.slice(1, imgSrcs.length)), movedImg];
                                            setImgSrcs(newImgSrcs);
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
                        <p id="galText">{imgSrcs[0][1]}</p>
                    </div >
                    : ''
            }
        </>
    )
});