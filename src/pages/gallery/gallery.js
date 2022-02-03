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
import tours from '../../images/tours.jpg';
import sassLink from '../../images/sassLink.jpg';
import regShow from '../../images/regShow.jpg';
import { BsGithub } from 'react-icons/bs';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [imgSrcs, setImgSrcs] = useState([
        [artGall, 'https://hopeful-shirley-03545b.netlify.app/', 'https://github.com/Moleso587587/React-Loading', 'This is my Gallery website. I was most proud of the animations for the images I did and the aesthetic. I also implemented a loading screen at the beginning of it. It was done in React as a component project.'],
        [synth, 'https://upbeat-agnesi-da2285.netlify.app/', 'https://github.com/Moleso587587/React-synthesizer-web-audio-api-project', 'This is my react synthesizer. After researching the documentation, I made a, what I might call, advanced utilization of the web audio api.'],
        [sassLink, 'https://www.npmjs.com/package/sass-link', 'https://github.com/Moleso587587/sass-link', "This was the first CLI command npm package I published, called sassLink. It's meant to look for sass partials in your folder and compile them into css."],
        [oldPortfolio, 'https://moleso587587.github.io/Old-Portfolio-Website/', 'https://github.com/Moleso587587/Old-Portfolio-Website', "This is my old portfolio website. I was pretty happy with the aesthetic, although I didn't like the font, and I was especially proud of the spinning 3d pyramid I made using 3d css."],
        [codingPage, 'https://moleso587587.github.io/Jquery-Index-Page-of-West-Mec-Coding/', 'https://github.com/Moleso587587/Jquery-Index-Page-of-West-Mec-Coding', "This is my west-mec coding page, made for my coding class. This was just meant to be a practice run of what I knew at the time."],
        [chess, 'https://moleso587587.github.io/Chess/', 'https://github.com/Moleso587587/Chess', "This one is, well, I'm sure you've guessed. It's chess. I started this very early when I began learning coding. It gave me a much deeper understanding of javascript and the html dom. It's unfinished but still has a lot of functionality."],
        [pokedex, 'https://moleso587587.github.io/JSON-Project-Pokedex/', 'https://github.com/Moleso587587/JSON-Project-Pokedex', "This is a pokedex web page, done as a practice of my understanding of web apis, and given from my coding teacher."],
        [venomPage, 'https://moleso587587.github.io/Group-Boot-Strap-Website/', 'https://github.com/Moleso587587/Group-Boot-Strap-Website', "This is a group project I did for childhood toys. I mainly worked on the Venom action figure page. I thought my part of the aesthetic was done very well."],
        [storeApi, 'https://westmecole.herokuapp.com/', 'https://github.com/Moleso587587/Store-api-mongoDB', "This is my MongoDB store api. I pull from info in the mongoDB database, and it generates a store done in Nodejs. I also uploaded this on Heroku."],
        [menu, 'https://gracious-bose-cdd7c5.netlify.app/', 'https://github.com/Moleso587587/react-menu', "This is a menu that I had to create as a duplicate to my coding teacher's menu page."],
        [tours, 'https://romantic-ardinghelli-f53311.netlify.app/', 'https://github.com/Moleso587587/React-Tours', "This is a tours page and, is a duplicate to a page my teacher made."],
        [reviews, 'https://distracted-volhard-89581c.netlify.app/', 'https://github.com/Moleso587587/React-Review-Switcher', "This is a duplicate page to my coding teacher's page that he had me do using a set of json data. It's a review page."],
        [regShow, 'https://moleso587587.github.io/Regular-Show-Fan-Page/', 'https://github.com/Moleso587587/Regular-Show-Fan-Page', 'This is a fan page I made for the show, Regular Show I made a while ago. It includes a js image changer. It also includes a form quiz and a theme changer'],
        [navbar, 'https://lucid-williams-233e06.netlify.app/', 'https://github.com/Moleso587587/React-Navbar', "This is a simple react navbar, meant to be fully scalable."],
        [qAndA, 'https://epic-bhaskara-824997.netlify.app/', 'https://github.com/Moleso587587/React-Accordion', "This is a q and a accordion I made in react."],
        [hummus, 'https://moleso587587.github.io/Hummus-Recipe/', 'https://github.com/Moleso587587/Hummus-Recipe', "This is an early webpage for a Hummus recipe, done as a test of my web design knowledge at the time."],
        [pizzaPage, 'https://moleso587587.github.io/Pizza-Page/', 'https://github.com/Moleso587587/Pizza-Page', "This is an early pizza page I made, which tested my knowledge of web design and forms"],
    ]);
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
        // sets up conditional rendering
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
                            document.removeEventListener('animationend', startGallery);
                        }
                    }
                    // styles change upon clicks, and certain things get changed after animations
                }
                else {
                    navigation('/');
                    setShift(' shift4B');
                    // styles change upon clicks
                }
            }}>{navText}</h1>
            {
                (render) ?
                    // conditional rendering
                    <div className='gallery web-page'>
                        <div className='img-orbit'>
                            <a ref={img1} className='satel' href={imgSrcs[6][1]}><img src={imgSrcs[6][0]} alt='image' /></a>
                            <a ref={img2} className='satel' href={imgSrcs[5][1]}><img src={imgSrcs[5][0]} alt='image' /></a>
                            <a ref={img3} className='satel' href={imgSrcs[4][1]}><img src={imgSrcs[4][0]} alt='image' /></a>
                            <a ref={img4} className='satel' href={imgSrcs[3][1]}><img src={imgSrcs[3][0]} alt='image' /></a>
                            <a ref={img5} className='satel' href={imgSrcs[2][1]}><img src={imgSrcs[2][0]} alt='image' /></a>
                            <a ref={img6} className='satel' href={imgSrcs[1][1]}><img src={imgSrcs[1][0]} alt='image' /></a>
                            <a className='current' href={imgSrcs[0][1]}><img src={imgSrcs[0][0]} alt='image' /></a>
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
                                    // wheel animation happens on click and imageSrcs array changes, changing the image sources
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
                                    // wheel animation happens on click and imageSrcs array changes, changing the image sources
                                }} />
                            </div>
                        </div>
                        <p id="galText"><a href={imgSrcs[0][2]}><BsGithub id="galGitHub" /></a><br />{imgSrcs[0][3]}</p>
                        {/* text and link based of imageSrcs array */}
                    </div >
                    : ''
            }
        </>
    )
});