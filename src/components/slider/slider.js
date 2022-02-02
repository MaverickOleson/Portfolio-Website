import React, { useRef } from 'react';

export default function Slider({ pos, setPos }) {
    const slideRef = useRef();
    function slider(e1) {
        function slide(e2) {
            if (e2.clientX > slideRef.current.offsetWidth + slideRef.current.offsetLeft) setPos(100);
            else if (e2.clientX < slideRef.current.offsetLeft) setPos(0);
            else {
                setPos((e2.clientX - slideRef.current.offsetLeft) / slideRef.current.offsetWidth * 100);
            }
            //checks if movement exceeds 180 degrees and sets value below 180 if true
        }
        function remove() {
            document.removeEventListener('pointermove', slide);
            document.removeEventListener('pointerup', remove);
        }
        if (e1.target.className === 'knob') {
            document.addEventListener('pointermove', slide);
            document.addEventListener('pointerup', remove);
        } else {
            setPos((e1.clientX - slideRef.current.offsetLeft) / (slideRef.current.offsetWidth / 100));
            document.addEventListener('pointermove', slide);
            document.addEventListener('pointerup', remove);
        }
    }
    return (
        <div ref={slideRef} onPointerDown={(e1) => { slider(e1) }} className='slider'>
            <div className='knob' style={{ left: `${pos}%` }} />
        </div>
    )
}
