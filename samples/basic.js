var sm = require('../lib/statemutate.js'),
	fa = require('./fileadapter.js');

// prepare data file
// fa.save('data.json',[{payload : 'One'}, {payload:'Two'}, {payload:'Three',value : 3}, {payload:'Four'}]);
var simpleModel = {
	text: '',
	valueSum: 0
}

performSimpleProjection(simpleModel, function(model) {
	console.log('Final result:');
	console.log(model);
});


function performSimpleProjection(model, callback){
	var projection = new sm.Projections();
	
	fa.load('./data.json', function(data) {
		projection
			.arrange(data)
			.append({payload : 'Last', value : -1})
			.for(model)
			.with(function(state, message) {
				state.text += message.payload + ' ';
				state.valueSum += message.value || 0;
				return state;
			})
			.perform(function(message){
				console.log('Step: ');
				console.log(message);
			});
		callback(model);
	});
}