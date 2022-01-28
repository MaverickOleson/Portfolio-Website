import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import person from '../../person.glb';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const careerRings = ['Words', 'Are', 'Pretty', 'Cool'];
    const [animReady, setAnimReady] = useState(true);
    const workExpCanvas = useRef();
    const resize = useRef(false);
    const keyPress = useRef(false);

    //make more variables

    async function expAnim() {
        const scene = new THREE.Scene();

        const stairLength = 10;

        //camera
        const cameraWidth = (stairLength > 9) ? stairLength * 1.6 : (stairLength > 4) ? stairLength * 2 : stairLength * 5;
        const cameraHeight = window.innerHeight / window.innerWidth * cameraWidth;
        const camera = new THREE.OrthographicCamera(-cameraWidth, cameraWidth, cameraHeight, -cameraHeight, -20, 100);
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);

        //stair
        for (var i = 1; i <= stairLength; i++) {
            var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, i), new THREE.MeshLambertMaterial({ color: 0xf00000 }));
            cube.position.y = stairLength - i - stairLength / 2;
            cube.position.z = i / 2 - Math.round(stairLength / 2) + 1;
            cube.castShadow = true;
            scene.add(cube);
        }

        //light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(2, 3, 1)
        scene.add(directionalLight);

        //renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: workExpCanvas.current });
        renderer.setPixelRatio(window.devicePixelRatio);
        if (window.innerWidth > window.innerHeight) {
            renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);
        } else {
            renderer.setSize(window.innerWidth * 2, window.innerHeight * 2);
        }

        const loader = new GLTFLoader();
        loader.load(person, (glb) => {
            const person = glb.scene;
            person.scale.set(0.5, 0.5, 0.5);
            person.position.y = 1.295 - stairLength / 2;
            const maxLeft = stairLength - Math.round(stairLength / 2) + 1.5;
            person.position.z = maxLeft;
            person.castShadow = true;
            scene.add(person);

            var currentFunc;
            var pastZ = person.position.z;
            var interval = 0;

            var pastY = person.position.y;

            function personRight() {
                if (pastZ === maxLeft - stairLength) {
                    currentFunc = undefined;
                    keyPress.current = false;
                    return;
                }
                if (person.position.z != pastZ - 1) {
                    interval++;
                    person.position.z = pastZ - interval / 10;
                    if (interval / 10 < 0.5) person.position.y = interval / 10 * 2 + pastY;
                    else { person.position.y = Math.sqrt(1 - Math.pow(interval / 10 * 4 - 3, 2)) / 4 + 1 + pastY }
                }
                else {
                    pastZ--;
                    interval = 0;
                    pastY++;
                    currentFunc = undefined;
                    keyPress.current = false;
                }
            }
            function personLeft() {
                if (pastZ === maxLeft) {
                    currentFunc = undefined;
                    keyPress.current = false;
                    return;
                }
                if (person.position.z !== pastZ + 1) {
                    interval++;
                    person.position.z = pastZ + interval / 10;
                    if (interval / 10 < 0.5) person.position.y = Math.sqrt(1 - Math.pow((1 - interval / 10) * 4 - 3, 2)) / 4 + pastY;
                    else { person.position.y = pastY - interval / 10 * 2 + 1 }
                }
                else {
                    pastZ++;
                    interval = 0;
                    pastY--;
                    currentFunc = undefined;
                    keyPress.current = false;
                }
            }

            document.addEventListener('keydown', (e) => {
                if (!keyPress.current && e.key === 'ArrowRight') {
                    currentFunc = personRight;
                }
                if (!keyPress.current && e.key === 'ArrowLeft') {
                    currentFunc = personLeft;
                }
            }, false);
            var a = Math.random();

            //animate
            function animate() {
                if (window.location.pathname === '/' || resize.current) {
                    resize.current = false;
                    return;
                }
                requestAnimationFrame(animate);
                if (currentFunc) {
                    keyPress.current = true;
                    currentFunc();
                }
                renderer.render(scene, camera);
            };
            animate()
        }, undefined, (error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (window.location.pathname === '/') {
            setAnimReady(false);
            setNavText('Work\nExp.');
        } else {
            setNavText('Home');
        }
        if (window.location.pathname === '/workExperience') {
            setRender(true);
        }
        if (animReady && workExpCanvas.current) expAnim();
        window.onresize = () => {
            resize.current = true;
            expAnim();
        }
    });

    return (
        <>
            <h1 className='navSquare' id="workExpNav" onClick={() => {
                if (window.location.pathname === '/') {
                    navigation('/workExperience');
                    setShift(' shift3F');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift3F') {
                            setAnimReady(true);
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                }
                else {
                    navigation('/');
                    setShift(' shift3B');
                    document.addEventListener('animationend', startWorkExp);
                    function startWorkExp(e) {
                        if (e.animationName === 'shift3B') {
                            setRender(false);
                            document.removeEventListener('animationend', startWorkExp);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='workExperience web-page'>
                        <div id="expCanvCont">
                            <canvas ref={workExpCanvas}></canvas>
                        </div>
                        asdf
                    </div >
                    : ''
            }
        </>
    )
});