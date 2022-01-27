import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import person from '../../person.glb';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];
    const [animReady, setAnimReady] = useState(true);
    const workExpCanvas = useRef();
    const keyPress = useRef(false);

    async function expAnim() {
        const scene = new THREE.Scene();

        //camera
        const cameraWidth = 15;
        const cameraHeight = window.innerHeight / window.innerWidth * cameraWidth;
        const camera = new THREE.OrthographicCamera(-cameraWidth, cameraWidth, cameraHeight, -cameraHeight, -20, 100);
        camera.position.set(7, 2, 5);
        camera.lookAt(0, 0, 0);

        //stair
        var length = 10;
        var scale = Math.round(length / 8)
        for (var i = 1; i <= length; i++) {
            var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, i), new THREE.MeshLambertMaterial({ color: 0xf00000 }));
            cube.position.y = length - i;
            cube.position.z = i / 2 - Math.round(length / 2) + 1;
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
        renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

        const loader = new GLTFLoader();
        loader.load(person, (glb) => {
            const person = glb.scene;
            person.scale.set(0.5, 0.5, 0.5);
            person.position.y = 1.295;
            person.position.z = length - Math.round(length / 2) + 1.5;
            person.castShadow = true;
            scene.add(person);

            var currentFunc;
            var pastZ = person.position.z;
            var interval = 0;

            var pastY = person.position.y;

            function personRight() {
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
                if (person.position.z != pastZ + 1) {
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
                console.log(keyPress.current)
                if (!keyPress.current && e.key === 'ArrowRight') {
                    currentFunc = personRight;
                    keyPress.current = true;
                }
                if (!keyPress.current && e.key === 'ArrowLeft') {
                    currentFunc = personLeft;
                    keyPress.current = true;
                }
            }, false);

            //animate
            function animate() {
                if (window.location.pathname === '/') return;
                requestAnimationFrame(animate);
                if (currentFunc) currentFunc();
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
        // else if (workExpCanvas.current) {
        //     document.addEventListener('animationend', startWorkExp);
        //     function startWorkExp(e) {
        //         if (e.animationName === 'shift3F') {
        //             expAnim();
        //             document.removeEventListener('animationend', startWorkExp);
        //         }
        //     }
        // }
    });

    // function forward(){
    //     while()
    // }

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
                        <canvas ref={workExpCanvas}></canvas>
                    </div >
                    : ''
            }
        </>
    )
});