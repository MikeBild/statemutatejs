function Projections(initial) {
	var self = this;
	var events = [];
	var initialState = initial;
	var currentState = initial;
	var projection = function(state, message) { return state; };

	self.Message = function(name, payload) {
		this.messageName = name || 'DefaultMessageName';
		this.payload = payload || '';	
	}
	self.for = function(initial) {
		initialState = initial;
		currentState = initial;
		return self;
	}
	self.append = function(message) {
		events.push(message);
		return self;
	}
	self.arrange = function(messages) {
		events = [];
		for(var index in messages) {
			events.push(messages[index]);
		}
		return self;
	}
	self.reset = function() {
		currentState = initialState;
		return self;
	}
	self.clear = function() {
		events = [];
		return self;
	}
	//laziness execution
	self.with = function(handler) {
		projection = handler;
		return self;
	}
	//fold events to state
	self.perform = function(onChanged) {
		state = currentState;
		for (var i = 0; i < events.length; i++) {
			state = projection(state, events[i]);
			if(onChanged) onChanged(state, events[i]); 
		}
		return state;
	}
}

(function(exports){
    exports.Projections = Projections;
})(typeof exports === 'undefined' ? this['Projections']={} : exports);