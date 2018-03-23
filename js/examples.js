var getExamples = function() {
	return {
		'closed': false,
		'remembered': {
			'Tree': {
				'0': {
					//'angle': 36
				},
				'1': {
					'axiom': 'A',
					'rules': '{"A": "[&FL!A]/////\'[&FL!A]///////\'[&FL!A]", "F": "S/////F", "S": "FL", "L": "[\'\'\'^^f]"}',
					'constants': 'F'
				},
				'2': {
					'iterations': 3,
					'hue': .31,
					'dhue': 0,
					'rotation': 22.5
				}
			},
			'Hilbert': {
				'0': {

				},
				'1': {
					'axiom': 'A',
					'rules': '{"A": "B-F+CFC+F-D&F^D-F+&&CFC+F+B//", "B": "A&F^CFB^F^D^^-F-D^|F^B|FC^F^A//", "C": "|D^|F^B-F+C^F^A&&FA&F^C+F+B^F^D//", "D": "|CFB-F+B|FA&F^A&&FB-F+B|FC//"}',
					'constants': 'F'
				},
				'2': {
					'iterations': 2,
					'hue': 0,
					'dhue': 3.8,
					'rotation': 90
				}
			}
		},
		"folders": {
			"LSystem": {
			"preset": "Default",
			"closed": false,
			"folders": {}
			},
			"Appearance": {
			"preset": "Default",
			"closed": false,
			"folders": {}
			}
		}
	};
}