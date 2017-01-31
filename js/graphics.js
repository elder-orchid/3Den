// Draws a line between two points
var drawLine = function(point1, point2) {
	var material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(point1[0], point1[1], point1[2]));
	geometry.vertices.push(new THREE.Vector3(point2[0], point2[1], point2[2]));

	var line = new THREE.Line(geometry, material);
	scene.add(line);
};

// Gets the end point of the line to be drawn based on the turtle's current orientation
var getDestination = function() {

	// TODO refactor
	var dist = 10;

	// Based on the header vector, return the resultant position
	var heading = turtle.state.orientation.resize([1, 3])._data[0];
	var destination = [];

	for(var i = 0; i < heading.length; i++) {
		destination.push(turtle.state.position[i] + heading[i] * dist);
	}
	return destination;
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
	switch(char) {
		// Turn left by θ
 		case '+':
			turtle.rotate(Ru(turtle.dTheta));
			break;

		// Turn right by θ
		case '-':
			turtle.rotate(Ru(-turtle.dTheta));
			break;

		// Pitch down by θ
		case '&':
			turtle.rotate(Rl(turtle.dTheta));
			break;

		// Pitch up by θ
		case '^':
			turtle.rotate(Rl(-turtle.dTheta));
			break;

		// Roll left by θ
		case '\\':
			turtle.rotate(Rh(turtle.dTheta));
			break;

		// Roll right by θ
		case '/':
			turtle.rotate(Rh(-turtle.dTheta));
			break;

		// Turn around
		case '|':
			turtle.rotate(Ru(Math.PI));
			break;

		// Move forward and draw line
		case 'F':
			var destination = getDestination();
			drawLine(turtle.state.position, destination);
			turtle.state.position = destination;
			break;

		// Save state
		case '[':
			var oldState = {};
			Object.assign(oldState, turtle.state);
			turtle.stack.push(oldState);
			break;
		
		// Read state
		case ']':
			turtle.state = turtle.stack.pop();
			break;

		default:
			console.log('The character \'' + char + '\' had no affect');
			break;
	}
};

// TODO rename?
var runSystem = function() {

	// Re-initialize turtle
	// ihat, jhat, khat
	var orientation = math.matrix([
			[1, 0, 0],
			[0, 1, 0],
			[0, 0, 1]
	]);
	var position = [0, 0, 0];
	var state = {position: position, orientation: orientation};
	turtle = new Turtle(state);
	turtle.dTheta = Math.PI / 2;

	for(var i = 0; i < lsystem.sentence.length; i++) {
		interpret(lsystem.sentence.charAt(i));
	}
}