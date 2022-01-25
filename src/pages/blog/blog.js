import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/slider';

export default React.memo(function Blog({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = ['long sentences', 'are so', 'extraordinarily and magnificently', 'wonderous'];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Blog');
        } else {
            setNavText('Home');
        }
        if (window.location.pathname === '/blog') {
            setRender(true);
        }
    });
    const postText = useRef();
    const postIndex = useRef(0);
    function switchPost() {
        var postNum = Math.floor(Math.round(pos) / 100 * posts.length);
        var post = posts[postNum] || posts[posts.length - 1];
        if (postText.current && postNum % 1 === 0 && postNum !== posts.length && postIndex.current !== postNum) {
            if (postNum > postIndex.current) {
                if (postText.current.className === 'slideRight1') postText.current.className = 'slideRight2';
                else {
                    postText.current.className = 'slideRight1';
                }
                postIndex.current = postNum;
            }
            if (postNum < postIndex.current) {
                if (postText.current.className === 'slideLeft1') postText.current.className = 'slideLeft2';
                else {
                    postText.current.className = 'slideLeft1';
                }
                postIndex.current = postNum;
            }
        }
        return post;
    }
    const a = useRef();
    return (
        <>
            <h1 className='navSquare' ref={a} id="blogNav" onClick={() => {
                if (window.location.pathname === '/') {
                    navigation('/blog');
                    setShift(' shift1F');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift1F') {
                            postText.current.style.display = 'block';
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                    document.addEventListener('animationstart', prepBlog);
                    function prepBlog(e) {
                        if (e.animationName === 'shift1F') {
                            postText.current.style.display = 'none';
                            document.removeEventListener('animationstart', prepBlog);
                        }
                    }
                }
                else {
                    navigation('/');
                    setShift(' shift1B');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift1B') {
                            setRender(false);
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='blog web-page'>
                        <Slider pos={pos} setPos={setPos} />
                        <div id="blogPostCont">
                            <h1 ref={postText} className='slideRight1' >{switchPost()}</h1>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});