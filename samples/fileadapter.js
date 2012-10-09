var fs = require('fs');

function save(filename, data) {	
	fs.writeFile(filename, JSON.stringify(data), function(err) {
	    if(err) throw err;
	});
}

function load(filename, callback) {
	fs.readFile(filename, function (err, data) {
		callback(err, JSON.parse(data));
	});
}
exports.save = save;
exports.load = load;