// Establish scene, camera, renderer, and controls as global variables.
var scene, camera, renderer, controls;

// Initialize our program and begin animation.
init();
animate();

function init() {
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

	drawLine([0, 0, 0], [10, 10, 10]);
	drawLine([0, 0, 0], [-10, 10, -10]);
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
}

function render() {
    renderer.render(scene, camera);
}

function drawLine(point1, point2) {
	var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(point1[0], point1[1], point1[2]));
	geometry.vertices.push(new THREE.Vector3(point2[0], point2[1], point2[2]));

	var line = new THREE.Line(geometry, material);
	scene.add(line);
}