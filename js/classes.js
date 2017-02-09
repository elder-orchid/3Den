class LSystem {
	constructor(axiom, rules) {
		this.sentence = axiom;
		this.rules = rules;
		this.iterate = function() {
			var newSentence = "";
			for(var index in this.sentence) {
				var swapped = false;
				for(var rule in rules) {
					if(this.sentence.substring(index, this.sentence.length).indexOf(rule) === 0) {
						newSentence += rules[rule].successor;
						this.sentence.slice(rule.length);
						swapped = true;
						break;
					}
				}
				if(!swapped) {
					newSentence += this.sentence.charAt(index);
					this.sentence.slice(1);
				}
			}
			this.sentence = newSentence;
		}
	}
}

class Turtle {
	constructor(state, dTheta) {
		this.stack = [];
		this.state = state;
		this.dTheta = dTheta;

		this.rotate = function(rotationMatrix) {
			this.state.orientation = multiply(this.state.orientation, rotationMatrix);
		};
	}
}