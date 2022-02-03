import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/slider';
import brain from '../../images/brain.jpg';
import tech from '../../images/tech.png';
import music from '../../images/music.png';
import joystick from '../../images/joystick.png';
import book from '../../images/book.jpg';

export default React.memo(function AboutMe({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [
        [brain, "I am a deep thinker, and I don't say that to brag. I have a deep appreciation for topics I like, and I love to put a lot of effort into wrapping my head entirely around them. People say you can think too much... I think they need to be a little more specific, because, while I think you can think too much about one thing, I never want to stop thinking about as many things as I can. My deep thinking stems from being a former compulsive perfectionist. I'm still a perfectionist, just not compulsively. I don't need to be a perfectionist, but, for something I really care about, I make sure to make a complete product. I had to learn to not be as compulsive with my perfectionism, because it got in the way of my mental health and my time."],
        [tech, "I love technology ('though not as much as you and me' - Kip from Napolean Dynamite). I've learned a lot of coding in the last two years in my coding class, and continue to do so. I also know a good chunk about computers and how technology as well. I'm going to be messing with a breadboard and a microcontroller real soon so I can learn more about electronics. I want to literally be able to anything with technology, make any machine I want. That would be the dream."],
        [music, "I love music. I want to be a musician, at least as a side to a different career, but I want to be a musician no matter what. I am currently learning to play the piano, although time away from school has been slim. Hopefully, after I put this website up, I'll have more time to work on that. I also have two synthesizers... a Korg Minilogue and a Arturia MicroFreak. They're both pretty insane. I've had a lot of fun with them. I also like to practice singing. Very few people have heard me really sing, but I haven't gotten bad press about it, so that's a start. I'm going to be writing a song for an animation my friend is making soon, so that'll definitely get my foot out the door for music writing as well."],
        [joystick, "I've always been passionate about video games. I find a sense of enjoyment with video games, different ones for different reasons. I like aesthetically pleasing video games with interesting storylines and I like high skill demanding games. Some games I LOVE include: Inscryption, Portal, In Sound Mind, and Fortnite (just let me explain this one). I like all of those games for their aesthetically pleasing and story driven nature, apart from Fortnite. Fortnite does have a neat aesthetic and an interesting storyline, but I mainly enjoy it for the high skill gap it has, which is one reason many people hate it so much. There's so much potential for skill level in the game because of the mechanics and it's amazing. I'd say I'm really good, as far as players go. I don't like the community though... people who play it can be very strange, unfortunately."],
        [book, "I love writing and storytelling. I've had a history with writing, getting high remarks by teachers, peers, and parents for some of my works. I haven't written anything especially long, but that's not necessarily important to me. I also have a lot of fun with campfire stories as well. You know why people shout Elmer, randomly in the woods. Me neither! And I'm not going to look it up, because I wrote a scary story that explains that which I told to my family. I also love movies and movie making. I, like many children, made movies when I was young. Nowadays, I try to find time to work on animation. I've made one so far, but I've written down a bunch of others. I also appreciate live action story telling as well as 3d story telling. I made small 3d animations when I was young, less than successfully. I've written down a metric ton of live action stories to tell, but who knows if I'll get the chance or resources for that."]
    ];
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
        const point = Math.round(pos);
        const post = posts[Math.floor(point / 100 * posts.length)] || posts[posts.length - 1];
        const postText = post[1].split(' ');
        return [postText.slice(0, Math.ceil(postText.length / 2)).reduce((a, c) => a + ' ' + c), (postText.length > 1) ? postText.slice(Math.ceil(postText.length / 2, postText.length)).reduce((a, c) => a + ' ' + c) : '', post[0]]
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
                            <img src={switchPost()[2]} />
                            <p>{switchPost()[1]}</p>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});