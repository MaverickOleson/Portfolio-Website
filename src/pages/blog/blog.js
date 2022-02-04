import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../components/slider/slider';

export default React.memo(function Blog({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = ["Like many people, I get sad sometimes. I get in states where I can't help but be mad at how much I've accomplished, things that go on in the world, and, most of all, these questions that boggle my mind, questions that I'm going to present in this blog. When I get upset like this, I usually wonder, is everyone lonely? We all live our lives so individually, physically incapable of feeling exactly what another is feeling. We're so closed up and focused on our problems, desires, needs, and we hardly can fathom that others experience the same as us. If we could, we wouldn't be so short tempered with our loved ones every so often. We're not good at thinking outside of ourselves. Even when we are with other people, we're constructing our own thoughts, our own opinions, and our own goals. Nevertheless, what we feel individually isn't any less important either, but I find it kind of silly... because, considering everyone experiences these feelings, and I mean EVERYONE, what would become of everyone coming in contact with each other and coming to terms with their loneliness, realizing they all have similar problems, and maybe even trying to solve them. I just think we're too divided, and I'd like that to end...",
        "I've often wondered... what is the best way to spend your time? In my youth, I used to spend it on video games, television, and games with friends. As I got older, I got absorbed into learning things on the computer and did computer art 3d modeling, and even trying to make a video game, along with the same stuff as before. Into my teens years, I became focused more on trying to learn things, like piano or technology, though with poor effort, and I also was heavily interested in math. As of 2020 to now, I've begun asking much deeper questions and learning more about what it takes to learn the things I'm interested in... and I've come quite far in doing that! I think finding interests is a very important way to spend your time. However, I think the most important way to spend your time is with another person. I don't believe any of our talents, skills, or interests give us any value without other people to appreciate them. I think the best way to spend your time is by giving yourself to someone you find really special, showing all of your interests, skills... your whole mind, as well as having them do the same for you.",
        "People ask quite often, does anything matter? Are we real, is the world pointless? I haven't been far from this nihilistic perspective, myself. However, through a couple years of straight thinking from 2020-2021, I think I found an answer that satisfies me. First of all, the question of if we're real I think is answered by itself. The fact that we can question this means we're real, since that we are a consciousness that has enough control to value and question our control. We are real, what we feel really does matters... because it matters to us, and that's the very reason we wonder that.",
        `I hate the phrase "it's just an opinion". When people leave things up to being "just an opinion", they're just too lazy to put in the effort to come to a proven conclusion. If everything was "just an opinion", how did we get this far? How could we have advanced in science this far if all we ever had was "just an opinion". It's like if Isaac Newton said, "I think there's this thing called gravity that keeps us pulled down, by that's just an opinion, don't even worry about it". If he had left it as "an opinion", where would we have gone from there? Opinions are constructions of what we think we know, in case we don't fully have the information, but that doesn't make them any less valuable. There used to make conclusions when you can't make a definitive conclusion, providing some sort of sense in the world... but opinions are right or wrong, believe it or not. There is truth in how the world works, and the idea of just an opinion throws truth out the window. But even so, that doesn't mean we should judge people for their opinions either. Like I said, opinions are what we think we know... meaning they spawn out of naivety. I truly don't believe naivety is blameful... to blame a naive person is equivalent to blaming a child for not knowing things. We should give others the benefit of the doubt... otherwise we're discouraging opinions, and opinions get us places. I like to use a different word in place of opinion: idea.`
    ];
    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Blog');
        }
        if (window.location.pathname === '/blog') {
            setNavText('Home');
            setRender(true);
        }
        // sets up conditional rendering
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
                    // styles change upon clicks, and certain things get changed after animations
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
                    // styles change upon clicks, and certain things get changed after animations
                }
            }}>{navText}</h1>
            {
                (render) ?
                    // conditional rendering
                    <div className='blog web-page'>
                        <Slider pos={pos} setPos={setPos} />
                        <div id="blogPostCont">
                            <h1 ref={postText} className='slideDown1' >{switchPost()}</h1>
                        </div>
                        {/* slider value changes the index of the posts array. */}
                    </div >
                    : ''
            }
        </>
    )
});