// Establish render related global variables.
var scene, camera, renderer, controls;

// Establish growth related global variables
var lsystem, turtle, rules;

var init = function() {
	// Initialize render variables
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	camera.position.set(0, 0, 100);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// Initialize growth variables
	rules = {
		'A' : new WeightedList({
			'[&FL!A]/////\'[&FL!A]///////\'[&FL!A]' : 1
		}),

		'F' : new WeightedList({
			'S/////F' : 1
		}),

		'S' : new WeightedList({
			'FL' : 1
		}),

		'L' : new WeightedList({
			'[\'\'\'^^{-f+f+f-|-f+f+f}]' : 1
		})
	};
	lsystem = new LSystem('A', rules);
	//turtle.dTheta = Math.PI / 6;

	for(var i = 0; i < 5; i++) {
		lsystem.iterate();
	}

	runSystem();
};

var animate = function() {
	requestAnimationFrame(animate);
	controls.update();
};

var render = function() {
    renderer.render(scene, camera);
};

// Initialize our program and begin animation.
init();
animate();