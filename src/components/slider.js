import React, { useState, useRef } from 'react';

export default function Slider() {
    const [pos, setPos] = useState(0);
    const slideRef = useRef();
    // const 
    function slide(e1) {
        document.addEventListener('pointermove', slide);
        function slide(e2) {
            if (e2.clientX > slideRef.current.offsetWidth + slideRef.current.offsetLeft) setPos(100);
            else if (e2.clientX < slideRef.current.offsetLeft) setPos(0);
            else {
                setPos((e2.clientX - slideRef.current.offsetLeft) / slideRef.current.offsetWidth * 100);
            }
            document.addEventListener('pointerup', remove);
            //checks if movement exceeds 180 degrees and sets value below 180 if true
        }
        function remove() {
            document.removeEventListener('pointermove', slide);
            document.removeEventListener('pointerup', remove);
        }
    }
    // useEffect(() => {
    //     value.current = (fullRot * factor + min * factor) + rotation * factor;
    // })
    return (
        <div ref={slideRef} className='slider'>
            <div className='knob' onPointerDown={(e1) => { slide(e1) }} style={{ left: `${pos}%` }} />
        </div>
    )
}
