var drawLine = function(point1, point2) {
	var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(point1[0], point1[1], point1[2]));
	geometry.vertices.push(new THREE.Vector3(point2[0], point2[1], point2[2]));

	var line = new THREE.Line(geometry, material);
	scene.add(line);
};

// Rotation matrices
var Ru = function(theta) {
	return math.matrix([
		[Math.cos(theta), Math.sin(theta), 0],
		[-Math.sin(theta), Math.cos(theta), 0],
		[0, 0, 1]
	]);
};

var Rl = function(theta) {
	return math.matrix([
		[Math.cos(theta), 0, -Math.sin(theta)],
		[0, 1, 0],
		[Math.sin(theta), 0, Math.cos(theta)]
	]);
};

var Rh = function(theta) {
	return math.matrix([
		[1, 0, 0],
		[0, Math.cos(theta), -Math.sin(theta)],
		[0, Math.sin(theta), Math.cos(theta)]
	]);
};

var interpret = function(char) {

	var theta = Math.PI/4;

	switch(char) {
		// Turn left by θ
 		case '+':
			turtle.rotate(Ru(theta));
			break;

		// Turn right by θ
		case '-':
			turtle.rotate(Ru(-theta));
			break;

		// Pitch down by θ
		case '&':
			turtle.rotate(Rl(theta));
			break;

		// Pitch up by θ
		case '^':
			turtle.rotate(Rl(-theta));
			break;

		// Roll left by θ
		case '\\':
			turtle.rotate(Rh(theta));
			break;

		// Roll right by θ
		case '/':
			turtle.rotate(Rh(-theta));
			break;

		// Turn around
		case '|':
			turtle.rotate(Ru(Math.PI));
			break;

		default:
			console.log('The character \'' + char + '\' had no affect');
			break;
	}
};