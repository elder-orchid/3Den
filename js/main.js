// Establish render related global variables.
var scene, camera, renderer, controls, datGUI;

// Establish growth related global variables
var lsystem, turtle, rules, properties;
var lightHelper;

var init = function() {
	// Initialize render variables
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	// Add lighting
	var spotLight = new THREE.SpotLight( 0xFFFFFF, 1);
	spotLight.position.set(105, 500, 35);
	spotLight.castShadow = true;
	spotLight.angle = Math.PI / 4;
	spotLight.penumbra = 0.05;
	spotLight.decay = 0;
	spotLight.distance = 200;
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;
	spotLight.shadow.camera.near = 1;
	spotLight.shadow.camera.far = 200;
	scene.add(spotLight);
	
	lightHelper = new THREE.SpotLightHelper(spotLight);
	//scene.add(lightHelper);

	// Add controls
	controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);

	camera.position.set(0, 0, 200);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// Add floor
	var loader = new THREE.TextureLoader();
	var floorTexture = new loader.load('img/tile.jpg');
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set(10, 10);
	var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.receiveShadow = true;
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

	// Initialize growth variables
	rules = {
		'A' : {successor: '[&FL!A]/////\'[&FL!A]///////\'[&FL!A]'},
		'F' : {successor: 'S/////F'},
		'S' : {successor: 'FL'},
		'L' : {successor: '[\'\'\'^^f]'}
	};

	lsystem = new LSystem('A', rules);

	for(var i = 0; i < 5; i++) {
		lsystem.iterate();
	}

	runSystem();
};

var animate = function() {
	controls.update();
	requestAnimationFrame(animate);
};

var render = function() {
	lightHelper.update();
    renderer.render(scene, camera);
};

// Initialize our program and begin animation.
init();
animate();