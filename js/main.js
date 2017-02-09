// Establish render related global variables.
var scene, camera, renderer, controls;

// Establish growth related global variables
var lsystem, turtle, rules, properties;

var init = function() {
	// Initialize render variables
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	camera.position.set(0, 0, 200);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// Initialize floor
	var loader = new THREE.TextureLoader();
	var floorTexture = new loader.load('img/tile.jpg');
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set(10, 10);
	var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

	// Initialize growth variables
	rules = {
		'A' : {successor: '[&FL!A]/////\'[&FL!A]///////\'[&FL!A]'},
		'F' : {successor: 'S ///// F'},
		'S' : {successor: 'F L'},
		'L' : {successor: '[\'\'\'^^{-f+f+f-|-f+f+f}]'}
	};

	lsystem = new LSystem('A', rules);

	for(var i = 0; i < 3; i++) {
		lsystem.iterate();
	}

	runSystem();
};

var animate = function() {
	controls.update();
	requestAnimationFrame(animate);
};

var render = function() {
    renderer.render(scene, camera);
};

// Initialize our program and begin animation.
init();
animate();