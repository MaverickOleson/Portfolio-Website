import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default React.memo(function Gallery({ setShift }) {
    const navigation = useNavigate();
    const [render, setRender] = useState(false);
    const [navText, setNavText] = useState();
    const [pos, setPos] = useState(0);
    const posts = [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']];

    const scene = new THREE.Scene();

    //camera
    const cameraWidth = 10;
    const cameraHeight = window.innerHeight / window.innerWidth * cameraWidth;
    const camera = new THREE.OrthographicCamera(-cameraWidth, cameraWidth, cameraHeight, -cameraHeight, 1, 1000);
    camera.position.set(4, 4, 4);
    camera.lookAt(0, 0, 0);

    //stair
    var length = 9;
    var scale = Math.round(length / 8)
    for (var i = 1; i <= length; i++) {
        var cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, i), new THREE.MeshLambertMaterial({ color: 0xff4000 }));
        cube.position.y = length - i;
        cube.position.z = i / 2;
        cube.castShadow = true;
        scene.add(cube);
    }

    // const loader = new GLTFLoader();
    // loader.load('./person.glb', (gltf) => {
    //     scene.add(gltf.scene)
    // }, undefined, (err) => {
    //     console.error(err);
    // })

    //plane
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(4, 30), new THREE.MeshLambertMaterial({ color: 0xffffff }));
    plane.rotation.set(Math.PI / 2, Math.PI, 0);
    plane.position.set(0, -0.5, 0)
    scene.add(plane);

    //light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 3, 1)
    scene.add(directionalLight);

    //renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    useEffect(() => {
        if (window.location.pathname === '/') {
            setNavText('Work\nExp.');
        } else {
            setNavText('Home');
        }
        if (window.location.pathname === '/workExperience') {
            setRender(true);
        }
    });
    useEffect(() => {


        //animate
        function animate() {
            requestAnimationFrame(animate);


            renderer.render(scene, camera);
        };
        animate()
    }, []);

    function switchPost() {
        var point = Math.round(pos);
        return posts[Math.floor(point / 100 * posts.length)] || posts[posts.length - 1];
    }

    return (
        <>
            <h1 className='navSquare' id="workExpNav" onClick={() => {
                if (window.location.pathname === '/') {
                    navigation('/workExperience');
                    setShift(' shift3F');
                }
                else {
                    navigation('/');
                    setShift(' shift3B');
                    document.addEventListener('animationend', startBlog);
                    function startBlog(e) {
                        if (e.animationName === 'shift3B') {
                            setRender(false);
                            document.removeEventListener('animationend', startBlog);
                        }
                    }
                }
            }}>{navText}</h1>
            {
                (render) ?
                    <div id="workExperience" className='workExperience web-page'>
                    </div >
                    : ''
            }
        </>
    )
});