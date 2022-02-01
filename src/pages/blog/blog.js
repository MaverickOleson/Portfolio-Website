import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/slider';

export default React.memo(function Blog({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = ["Like many people, I get sad sometimes. I get in states where I can't help but be mad at how much I've accomplished, things that go on in the world, and, most of all, these questions that boggle my mind, questions that I'm going to present in this blog. When I get upset like this, I usually wonder, is everyone lonely? We all live our lives so individually, physically incapable of feeling exactly what another is feeling. We're so closed up and focused on our problems, desires, needs, and we hardly can fathom that others experience the same as us. If we could, we wouldn't be so short tempered with our loved ones every so often. We're not good at thinking outside of ourselves. Even when we are with other people, we're constructing our own thoughts, our own opinions, and our own goals. Nevertheless, what we feel individually isn't any less important either, but I find it kind of silly... because, considering everyone experiences these feelings, and I mean EVERYONE, what would become of everyone coming in contact with each other and coming to terms with their loneliness, realizing they all have similar problems, and maybe even trying to solve them. I just think we're too divided, and I'd like that to end...",
        'are so',
        'extraordinarily and magnificently',
        'wonderous'];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Blog');
        }
        if (window.location.pathname === '/blog') {
            setNavText('Home');
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
                if (postText.current.className === 'slideDown1') postText.current.className = 'slideDown2';
                else {
                    postText.current.className = 'slideDown1';
                }
                postIndex.current = postNum;
            }
            if (postNum < postIndex.current) {
                if (postText.current.className === 'slideUp1') postText.current.className = 'slideUp2';
                else {
                    postText.current.className = 'slideUp1';
                }
                postIndex.current = postNum;
            }
        }
        return post;
    }
    return (
        <>
            <h1 className='navSquare' id="blogNav" onPointerDown={() => {
                if (window.location.pathname === '/') {
                    navigation('/blog');
                    setShift(' shift1F');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift1F') {
                            setShift(' blog');
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
                    document.addEventListener('animationend', endBlog);
                    function endBlog(e) {
                        if (e.animationName === 'shift1B') {
                            setRender(false);
                            document.removeEventListener('animationend', endBlog);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='blog web-page'>
                        <Slider pos={pos} setPos={setPos} />
                        <div id="blogPostCont">
                            <h1 ref={postText} className='slideDown1' >{switchPost()}</h1>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});