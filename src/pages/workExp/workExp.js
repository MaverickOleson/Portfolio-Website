import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import person from '../../person.glb';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const careerRings = ['<h2>Became an Eagle Scout</h2>After 8 years of going to meetings and doing work to earn merit badges, I ', 'Are', 'Pretty', 'Cool'];
    const currentRing = useRef(-1);
    const [animReady, setAnimReady] = useState(true);
    const personFunctions = useRef([]);
    const workExpCanvas = useRef();
    const resize = useRef(false);
    const keyPress = useRef(false);
    const expText = useRef();

    //make more variables

    async function expAnim() {
        const scene = new THREE.Scene();

        //camera
        const cameraWidth = (careerRings.length > 9) ? careerRings.length * 1.6 : (careerRings.length > 4) ? careerRings.length * 2 : careerRings.length * 5;
        const cameraHeight = window.innerHeight / window.innerWidth * cameraWidth;
        const camera = new THREE.OrthographicCamera(-cameraWidth, cameraWidth, cameraHeight, -cameraHeight, -20, 100);
        camera.position.set(4, 4, 4);
        camera.lookAt(0, 0, 0);

        //stair
        for (var i = 1; i <= careerRings.length; i++) {
            var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, i), new THREE.MeshLambertMaterial({ color: 0xf00000 }));
            cube.position.y = careerRings.length - i - careerRings.length / 2;
            cube.position.z = i / 2 - Math.round(careerRings.length / 2) + 1;
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
            person.position.y = 1.295 - careerRings.length / 2;
            const maxLeft = careerRings.length - Math.round(careerRings.length / 2) + 1.5;
            person.position.z = maxLeft;
            person.castShadow = true;
            scene.add(person);

            var pastZ = person.position.z;
            var interval = 0;

            var pastY = person.position.y;

            function personRight() {
                if (pastZ === maxLeft - careerRings.length) {
                    personFunctions.current[0] = undefined;
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
                    personFunctions.current[0] = undefined;
                    keyPress.current = false;
                    currentRing.current++;
                    expText.current.innerHTML = careerRings[currentRing.current] || '';
                    (expText.current.className === 'slideRight1') ? expText.current.className = 'slideRight2' : expText.current.className = 'slideRight1';
                }
            }
            function personLeft() {
                if (pastZ === maxLeft) {
                    personFunctions.current[0] = undefined;
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
                    personFunctions.current[0] = undefined;
                    keyPress.current = false;
                    currentRing.current--;
                    expText.current.innerHTML = careerRings[currentRing.current] || '';
                    (expText.current.className === 'slideLeft1') ? expText.current.className = 'slideLeft2' : expText.current.className = 'slideLeft1';
                }
            }

            personFunctions.current = [undefined, personRight, personLeft]

            //animate
            function animate() {
                if (window.location.pathname === '/' || resize.current) {
                    resize.current = false;
                    return;
                }
                requestAnimationFrame(animate);
                if (personFunctions.current[0]) {
                    keyPress.current = true;
                    personFunctions.current[0]();
                }
                renderer.render(scene, camera);
            };
            animate()
        }, undefined, (error) => {
            console.error(error);
        });
    }

    function personControls(e) {
        if (personFunctions.current[1]) {
            if (!keyPress.current && (e.code === 'ArrowRight' || e.code === 'KeyD')) {
                personFunctions.current[0] = personFunctions.current[1];
            }
            if (!keyPress.current && (e.code === 'ArrowLeft' || e.code === 'KeyA')) {
                personFunctions.current[0] = personFunctions.current[2];
            }
        }
    }

    useEffect(() => {
        if (window.location.pathname === '/') {
            setAnimReady(false);
            setNavText('Work\nExp.');
        } else {
            setNavText('Home');
        }
        if (window.location.pathname === '/workExperience') {
            window.onresize = () => {
                resize.current = true;
                expAnim();
                expText.current.innerHTML = '';
                currentRing.current = -1;
            }
            setRender(true);
        }
        if (animReady && workExpCanvas.current) { expAnim(); currentRing.current = -1; };
    });

    useEffect(() => {
        document.addEventListener('keydown', personControls, false);
    }, []);

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
                        <div id="exp">
                            <div id="expCanvCont">
                                <canvas ref={workExpCanvas}></canvas>
                            </div>
                            <div id="expTextCont">
                                <h1 ref={expText}></h1>
                            </div>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});