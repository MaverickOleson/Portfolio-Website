import React, { useEffect, useState, useRef } from 'react';
import artGall from '../images/artGallerySmall.png';
import synth from '../images/synthSmall.png';
import { useNavigate } from 'react-router-dom';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';

export default React.memo(function Gallery({ shift, setShift }) {
    const navigation = useNavigate();
    const [navText, setNavText] = useState();
    const imgSrcs = [artGall, synth];
    const [imgSrcIndex, setImgSrcIndex] = useState(0);
    const img1 = useRef();
    const img2 = useRef();
    const img3 = useRef();
    const img4 = useRef();
    const img5 = useRef();
    const img6 = useRef();
    useEffect(() => {
        if (window.location.pathname == '/') {
            setNavText('Gallery')
        } else {
            setNavText('Home')
        }
    })
    return (
        <div className='gallery web-page'>
            <h1 className='navSquare' onClick={() => {
                if (window.location.pathname === '/') {
                    setShift(' shift4F');
                    setTimeout(() => {
                        navigation('/gallery');
                        sessionStorage.setItem('shift', ' gallery');
                    }, 500);
                }
                else {
                    setShift(' shift4B');
                    setTimeout(() => {
                        navigation('/');
                        sessionStorage.setItem('shift', '');
                    }, 500);
                }
                // document.getElementsByClassName('gallery')[0].style.animation = 'gallery-open 0.5s forwards';
            }}>{navText}</h1>
            <div className='img-orbit'>
                <img ref={img1} src={imgSrcs[imgSrcIndex]} />
                <img ref={img2} src={imgSrcs[imgSrcIndex]} />
                <img ref={img3} src={imgSrcs[imgSrcIndex]} />
                <img ref={img4} src={imgSrcs[imgSrcIndex]} />
                <img ref={img5} src={imgSrcs[imgSrcIndex]} />
                <img ref={img6} src={imgSrcs[imgSrcIndex]} />
                <img src={imgSrcs[imgSrcIndex]} className='current' />
                <div className='orbiters'>
                    <ImArrowLeft onClick={() => {
                        setTimeout(() => {
                            setImgSrcIndex(imgSrcIndex - 1);
                            img6.current.classList.remove('disappear');
                            img1.current.classList.remove('fade-in');
                            img2.current.classList.remove('rotate1');
                            img3.current.classList.remove('rotate2');
                            img4.current.classList.remove('rotate3');
                            img5.current.classList.remove('rotate4');
                        }, 500);
                        img6.current.classList.add('disappear')
                        img1.current.classList.add('fade-in')
                        img2.current.classList.add('rotate1')
                        img3.current.classList.add('rotate2')
                        img4.current.classList.add('rotate3')
                        img5.current.classList.add('rotate4')
                    }} />
                    <ImArrowRight onClick={() => {
                        setTimeout(() => {
                            if (imgSrcIndex + 1 == imgSrcs.length) {
                                setImgSrcIndex(0);
                            }
                            else {
                                setImgSrcIndex(imgSrcIndex + 1)
                            }
                            img6.current.classList.remove('disappear');
                            img1.current.classList.remove('fade-in');
                            img2.current.classList.remove('rotate1');
                            img3.current.classList.remove('rotate2');
                            img4.current.classList.remove('rotate3');
                            img5.current.classList.remove('rotate4');
                        }, 500);
                        img6.current.classList.add('disappear')
                        img1.current.classList.add('fade-in')
                        img2.current.classList.add('rotate1')
                        img3.current.classList.add('rotate2')
                        img4.current.classList.add('rotate3')
                        img5.current.classList.add('rotate4')
                    }} />
                </div>
            </div>
        </div >
    )
});