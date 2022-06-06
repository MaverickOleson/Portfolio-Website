import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import person from "../../person.glb";

export default React.memo(function Career({ setShift }) {
	const navigation = useNavigate();
	const [render, setRender] = useState(false);
	const [navText, setNavText] = useState();
	const careerRings = [
		"<h3>Eagle Scout</h3>After 4 years of going to meetings and doing work to earn merit badges, along with an Eagle Scout project, I was able to become an Eagle Scout. It took hard work and dedication to be able to do this, and, through it, I learned leadership, practical skills, communication skills, and experience in service projects. The biggest project that I participated in was my Eagle Scout Project, titled 'The Wall'. I had to plan this project out all on my own and instruct volunteers to be able to do the task of shoveling and evenly distributing 4 tons of rock in front of an elderly hospital. Prior to this endeavor, while I was initially asked to do this by the hospital itself, I had to seek permission from the city of Phoenix to be able to distribute this rock, as the exact property wasn't officially owned by the hospital. To complete this task, I had to calculate the amount of rock the hospital would have to provision me with, list out and secure supplies for volunteers, put out fliers and make public announcements to gain volunteers, as well as instruct, lead, and provide food for said volunteers during the process of distributing the rock. The whole thing took weeks of planning, but I did indeed succeed in this task, gained the gratitude of the hospital, and recieved my Eagle Scout.",
		"<h3>Employed at McDonalds</h3>For my first job, for about three months working 15 hours a week, I worked as a cook at McDonald as a summer job. It was hard work. I had to clean stoves, cook patties, fry meat, supply fridges, clean the kitchen, and more. The job required dexterity, precision, and muscle. In order to be able to succeed at this job, it took a lot of adapting, but I eventually gained comfort in my position and did what I would consider a good job.",
		"<h3>MTA</h3>I am certified for MTA Web Development fundamentals.",
		"<h3>CIW</h3>I have taken and passed the CIW Javascript Specialist test, validating a deep, employable understanding of javascript.",
		"<h3>Graduated West Mec Coding</h3>I graduated from West Mec's coding program, where I was able to gain certifications, college credits, and experience for web design and program problem solving.",
		"<h3>Employed at Preventive Pest Control</h3>I now currently work at Preventive Pest Control as IT. I manage devices, digital contracts, emails, databases, applications, and more. I have gotten to use a lot of my experience in web development and javascript to be able to improve systems in the business, meaning I am gaining real world experience as a coder.",
	];
	const currentRing = useRef(-1);
	const [animReady, setAnimReady] = useState(true);
	const personFunctions = useRef([]);
	const careerCanvas = useRef();
	const keyPress = useRef(false);
	const careerText = useRef();

	async function careerAnim() {
		// scene
		const scene = new THREE.Scene();

		//camera
		const cameraWidth =
			careerRings.length > 9
				? careerRings.length * 0.8
				: careerRings.length > 4
				? careerRings.length
				: careerRings.length > 2
				? careerRings.length * 1.5
				: careerRings.length * 2.5;
		const camera = new THREE.OrthographicCamera(
			-cameraWidth,
			cameraWidth,
			cameraWidth,
			-cameraWidth,
			-20,
			100
		);
		camera.position.set(4, 4, 4);
		camera.lookAt(0, 0, 0);

		//stair
		for (var i = 1; i <= careerRings.length; i++) {
			var cube = new THREE.Mesh(
				new THREE.BoxGeometry(1, 1, i),
				new THREE.MeshLambertMaterial({ color: 0xf00000 })
			);
			cube.position.y = careerRings.length - i - careerRings.length / 2;
			cube.position.z = i / 2 - Math.round(careerRings.length / 2) + 1;
			cube.castShadow = true;
			scene.add(cube);
		}

		//light
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(2, 3, 1);
		scene.add(directionalLight);

		//renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: careerCanvas.current,
		});
		renderer.setPixelRatio(window.devicePixelRatio);

		// imported model
		const loader = new GLTFLoader();
		loader.load(
			person,
			(glb) => {
				//model
				const person = glb.scene;
				person.scale.set(0.5, 0.5, 0.5);
				person.position.y = 1.295 - careerRings.length / 2;
				const maxLeft =
					careerRings.length - Math.round(careerRings.length / 2) + 1.5;
				person.position.z = maxLeft;
				person.castShadow = true;
				scene.add(person);

				// model movement values
				var pastZ = person.position.z;
				var interval = 0;
				var pastY = person.position.y;

				// changes movement values to go right
				function personRight() {
					if (pastZ === maxLeft - careerRings.length) {
						// checks if function is too far right
						personFunctions.current[0] = undefined;
						keyPress.current = false;
						return;
					}
					if (person.position.z !== pastZ - 1) {
						// changes position of person for every frame
						interval++;
						person.position.z = pastZ - interval / 10;
						if (interval / 10 < 0.5)
							person.position.y = (interval / 10) * 2 + pastY;
						else {
							person.position.y =
								Math.sqrt(1 - Math.pow((interval / 10) * 4 - 3, 2)) / 4 +
								1 +
								pastY;
						}
					} else {
						// resets model movement values
						pastZ--;
						interval = 0;
						pastY++;
						personFunctions.current[0] = undefined;
						// turns of keypress
						keyPress.current = false;
						// text changed
						currentRing.current++;
						careerText.current.innerHTML =
							careerRings[currentRing.current] || "<h3>My Career</h3>";
						careerText.current.className === "appear1"
							? (careerText.current.className = "appear2")
							: (careerText.current.className = "appear1");
					}
				}
				// changes movement values to go left
				function personLeft() {
					if (pastZ === maxLeft) {
						// checks if function is too far left
						personFunctions.current[0] = undefined;
						keyPress.current = false;
						return;
					}
					if (person.position.z !== pastZ + 1) {
						// changes position of person for every frame
						interval++;
						person.position.z = pastZ + interval / 10;
						if (interval / 10 < 0.5)
							person.position.y =
								Math.sqrt(1 - Math.pow((1 - interval / 10) * 4 - 3, 2)) / 4 +
								pastY;
						else {
							person.position.y = pastY - (interval / 10) * 2 + 1;
						}
					} else {
						// resets model movement values
						pastZ++;
						interval = 0;
						pastY--;
						personFunctions.current[0] = undefined;
						// turns of keypress
						keyPress.current = false;
						// text changed
						currentRing.current--;
						careerText.current.innerHTML =
							careerRings[currentRing.current] || "<h3>My Career</h3>";
						careerText.current.className === "appear1"
							? (careerText.current.className = "appear2")
							: (careerText.current.className = "appear1");
					}
				}

				// functions to be used in animation function are stored in a variable
				personFunctions.current = [undefined, personRight, personLeft];

				//animate
				function animate() {
					// animation cancels if the page is changed
					if (window.location.pathname !== "/career") return;
					// size of renderer based on size of window
					if (window.innerWidth > window.innerHeight)
						renderer.setSize(
							window.innerWidth * 0.38,
							window.innerWidth * 0.38
						);
					else {
						renderer.setSize(window.innerWidth * 0.8, window.innerWidth * 0.8);
					}
					// loop for requesting current frame
					requestAnimationFrame(animate);
					// if a function is set, it will animate the person either right or left
					if (personFunctions.current[0]) {
						personFunctions.current[0]();
					}
					// render
					renderer.render(scene, camera);
				}
				animate();
			},
			undefined,
			(error) => {
				console.error(error);
			}
		);
	}

	// on certain key presses, right or left movement function is set as the current function, and the keypress is set to true, preventing multiple keys down at once
	function personControls(e) {
		if (personFunctions.current[1]) {
			if (!keyPress.current && (e.code === "ArrowRight" || e.code === "KeyD")) {
				personFunctions.current[0] = personFunctions.current[1];
				keyPress.current = true;
			}
			if (!keyPress.current && (e.code === "ArrowLeft" || e.code === "KeyA")) {
				personFunctions.current[0] = personFunctions.current[2];
				keyPress.current = true;
			}
		}
	}

	// event listener
	document.addEventListener("keydown", personControls, false);

	useEffect(() => {
		if (window.location.pathname === "/") {
			setAnimReady(false);
			setNavText("Career");
		}
		if (window.location.pathname === "/career") {
			setNavText("Home");
			setRender(true);
		}
		if (animReady && careerCanvas.current) {
			setAnimReady(false);
			careerAnim();
			currentRing.current = -1;
		}
		// sets up conditional rendering and begins three js render
	});
	return (
		<>
			<h1
				className="navSquare"
				id="careerNav"
				onPointerDown={() => {
					if (window.location.pathname === "/") {
						navigation("/career");
						setShift(" shift3F");
						document.addEventListener("animationend", startBlog);
						function startBlog(e) {
							if (e.animationName === "shift3F") {
								setShift(" career");
								setAnimReady(true);
								document.removeEventListener("animationend", startBlog);
							}
						}
						// styles change upon clicks, and certain things get changed after animations
					} else {
						navigation("/");
						setShift(" shift3B");
						document.addEventListener("animationend", endCareer);
						function endCareer(e) {
							if (e.animationName === "shift3B") {
								setRender(false);
								document.removeEventListener("animationend", endCareer);
							}
						}
						// styles change upon clicks, and certain things get changed after animations
					}
				}}
			>
				{navText}
			</h1>
			{render ? (
				// conditional rendering
				<div className="career web-page">
					<div id="career">
						<div id="careerCanvCont">
							<canvas ref={careerCanvas}></canvas>
							<div
								id="arrowLeft"
								onPointerDown={() => {
									personFunctions.current[0] = personFunctions.current[2];
								}}
							/>
							<div
								id="arrowRight"
								onPointerDown={() => {
									personFunctions.current[0] = personFunctions.current[1];
								}}
							/>
							{/* simulated key presses using pointerdown, to trigger movement functions */}
						</div>
						<div id="careerTextCont">
							<p ref={careerText}>
								<h3>My Career</h3>
							</p>
						</div>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
});
