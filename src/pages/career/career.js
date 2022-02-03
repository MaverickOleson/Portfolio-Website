import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import person from '../../person.glb';

export default React.memo(function Career({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const careerRings = [
        '<h3>I Became an Eagle Scout</h3>After 4 years of going to meetings and doing work to earn merit badges, along with an Eagle Scout project, I became an Eagle Scout. For my Eagle Scout project, I had to contact the city of Phoenix, gather supplies, put out fliers at my church, and lead a group of people in shoveling 4 tons of rock on the front of wall for a elderly hospital.',
        "<h3>I worked at McDonalds</h3>For about three months, I worked as a cook at McDonald as a summer job. It was hard work. I had to clean stoves, cook patties, fry meat, supply fridges, clean the kitchen, and so on. It went well as far as what I accomplished. I left upon school's arrival.",
        "<h3>CIW (in progress)</h3>As a part of my coding class, I am currently working on my CIW certification. I will be taking the test in April, and will better validate my status as a good coder and programmer.",
    ];
    const currentRing = useRef(-1);
    const [animReady, setAnimReady] = useState(true);
    const personFunctions = useRef([]);
    const careerCanvas = useRef();
    const keyPress = useRef(false);
    const careerText = useRef();

    async function careerAnim() {
        const scene = new THREE.Scene();

        //camera
        const cameraWidth = (careerRings.length > 9) ? careerRings.length * 0.8 : (careerRings.length > 4) ? careerRings.length : (careerRings.length > 2) ? careerRings.length * 1.5 : careerRings.length * 2.5;
        const camera = new THREE.OrthographicCamera(-cameraWidth, cameraWidth, cameraWidth, -cameraWidth, -20, 100);
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
        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: careerCanvas.current });
        renderer.setPixelRatio(window.devicePixelRatio);

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
                if (person.position.z !== pastZ - 1) {
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
                    careerText.current.innerHTML = careerRings[currentRing.current] || '<h3>My Career</h3>';
                    (careerText.current.className === 'appear1') ? careerText.current.className = 'appear2' : careerText.current.className = 'appear1';
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
                    careerText.current.innerHTML = careerRings[currentRing.current] || '<h3>My Career</h3>';
                    (careerText.current.className === 'appear1') ? careerText.current.className = 'appear2' : careerText.current.className = 'appear1';
                }
            }

            personFunctions.current = [undefined, personRight, personLeft];

            //animate
            function animate() {
                if (window.location.pathname === '/') return;
                if (window.innerWidth > window.innerHeight) renderer.setSize(window.innerWidth * 0.38, window.innerWidth * 0.38);
                else {
                    renderer.setSize(window.innerWidth * 0.8, window.innerWidth * 0.8);
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

    document.addEventListener('keydown', personControls, false);

    useEffect(() => {
        if (window.location.pathname === '/') {
            setAnimReady(false);
            setNavText('Career');
        }
        if (window.location.pathname === '/career') {
            setNavText('Home');
            setRender(true);
        }
        if (animReady && careerCanvas.current) {
            setAnimReady(false);
            careerAnim();
            currentRing.current = -1;
        };
    });
    return (
        <>
            <h1 className='navSquare' id="careerNav" onPointerDown={() => {
                if (window.location.pathname === '/') {
                    navigation('/career');
                    setShift(' shift3F');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift3F') {
                            setShift(' career');
                            setAnimReady(true);
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                }
                else {
                    navigation('/');
                    setShift(' shift3B');
                    document.addEventListener('animationend', endCareer);
                    function endCareer(e) {
                        if (e.animationName === 'shift3B') {
                            setRender(false);
                            document.removeEventListener('animationend', endCareer);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div className='career web-page'>
                        <div id="career">
                            <div id="careerCanvCont">
                                <canvas ref={careerCanvas}></canvas>
                                <div id="arrowLeft" onPointerDown={() => {
                                    document.dispatchEvent(new KeyboardEvent('keydown', {
                                        'code': 'KeyA'
                                    }))
                                }} />
                                <div id="arrowRight" onPointerDown={() => {
                                    document.dispatchEvent(new KeyboardEvent('keydown', {
                                        'code': 'KeyD'
                                    }))
                                }} />
                            </div>
                            <div id="careerTextCont">
                                <p ref={careerText}><h3>My Career</h3></p>
                            </div>
                        </div>
                    </div >
                    : ''
            }
        </>
    )
});