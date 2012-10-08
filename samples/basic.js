var sm = require('../lib/statemutate.js');

var projection = new sm.Projections();

var model = {
	text: '',
	valueSum: 0
}
var data = projection
		.arrange([{payload : 'One'}, new projection.Message('','Two'), {payload:'Three', value : 3},{payload:'Four'}])
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
console.log('Final result:')
console.log(data);