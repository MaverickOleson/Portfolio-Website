import React, { useRef } from 'react';
import artGall from '../images/artGallerySmall.png';
import synth from '../images/synthSmall.png';

export default function Gallery() {
    const imgSrcs = [artGall, synth];
    const img1 = useRef();
    const img2 = useRef();
    const img3 = useRef();
    const img4 = useRef();
    const img5 = useRef();
    const img6 = useRef();
    return (
        <div className='gallery'>
            <div className='img-orbit'>
                <img ref={img1} src={imgSrcs[imgSrcs.length - 1]} />
                <img ref={img2} src={imgSrcs[6 % 1]} />
                <img ref={img3} src={imgSrcs[6 % 2]} />
                <img ref={img4} src={imgSrcs[1]} />
                <img ref={img5} src={imgSrcs[0]} />
                <img ref={img6} src={imgSrcs[6 % 5]} />
                <img src={imgSrcs[5 % 1]} className='current' />
            </div>
            <button onClick={() => {
                setTimeout(() => {
                    img6.current.classList.remove('disappear')
                    img1.current.classList.remove('fade-in');
                    img2.current.classList.remove('rotate1')
                    img3.current.classList.remove('rotate2')
                    img4.current.classList.remove('rotate3')
                    img5.current.classList.remove('rotate4')
                }, 1000);
                img6.current.classList.add('disappear')
                img1.current.classList.add('fade-in')
                img2.current.classList.add('rotate1')
                img3.current.classList.add('rotate2')
                img4.current.classList.add('rotate3')
                img5.current.classList.add('rotate4')
            }}>asdfsdfafa</button>
        </div>
    )
}
