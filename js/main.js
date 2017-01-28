// Establish scene, camera, renderer, and controls as global variables.
var scene, camera, renderer, controls;

// Establish growth related global variables
var turtle;

var init = function() {
	// Initialize global variables
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	camera.position.set(0, 0, 100);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	var orientation = math.ones(3, 3);
	var position = [0, 0, 0];
	var state = {position: position, orientation: orientation};
	turtle = new Turtle(state);
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