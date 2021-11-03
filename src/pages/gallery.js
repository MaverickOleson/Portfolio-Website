import React from 'react';
import synth from '../images/synth.png';

export default function Gallery() {
    return (
        <div className='gallery'>
            <div className='img-orbit'>
                <img src='https://i.stack.imgur.com/mwFzF.png' />
                <img src='https://i.stack.imgur.com/mwFzF.png' />
                <img src={synth} />
                <img src='https://i.stack.imgur.com/mwFzF.png' />
                <img src='https://i.stack.imgur.com/mwFzF.png' />
                <img src='https://i.stack.imgur.com/mwFzF.png' className='current' />
            </div>
        </div>
    )
}
