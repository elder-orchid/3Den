var getExamples = function() {
	return {
		'preset': 'Koch',
		'closed': false,
		'remembered' : {
			'thing?': {
				'0': {
					'angle': 36
				},
				'1': {
					'axiom': 'A',
					'rules': '{"A": "[&FL!A]/////\'[&FL!A]///////\'[&FL!A]", "F": "S/////F", "S": "FL", "L": "[\'\'\'^^f]"}',
					'constants': 'F'
				},
				'2': {
					'iterations': 5,
					'dhue': 1.3,
					'zoom': 38,
					'rotation': 0
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