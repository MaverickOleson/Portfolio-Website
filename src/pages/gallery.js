import React, { useState, useRef } from 'react';
import artGall from '../images/artGallerySmall.png';
import synth from '../images/synthSmall.png';

export default React.memo(function Gallery({ state }) {
    const imgSrcs = [artGall, synth];
    const [imgSrcIndex, setImgSrcIndex] = useState(0);
    const img1 = useRef();
    const img2 = useRef();
    const img3 = useRef();
    const img4 = useRef();
    const img5 = useRef();
    const img6 = useRef();
    return (
        <div className={`web-page gallery ${state || ''}`}>
            <div className='img-orbit'>
                <img ref={img1} src={imgSrcs[imgSrcIndex % 6 || 0]} />
                <img ref={img2} src={imgSrcs[imgSrcIndex % 6 || 0]} />
                <img ref={img3} src={imgSrcs[imgSrcIndex]} />
                <img ref={img4} src={imgSrcs[imgSrcIndex]} />
                <img ref={img5} src={imgSrcs[imgSrcIndex]} />
                <img ref={img6} src={imgSrcs[imgSrcIndex]} />
                <img src={imgSrcs[imgSrcIndex]} className='current' />
            </div>
            <button onClick={() => {
                setTimeout(() => {
                    setImgSrcIndex(imgSrcIndex + 1);
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
            }}>asdfsdfafa</button>
        </div>
    )
});