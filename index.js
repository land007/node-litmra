const Signal = require('await-signal');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

var signals = {};

let unite_last = async function() {
//	console.log('arguments', arguments);
	_arguments = [];
	let i = 0;
	let fun = arguments[0];
	if(fun === undefined) {
		return;
	}
	if(typeof fun != 'function') {
		return;
	}
	for(let a in arguments) {
		if(i > 0) {
			_arguments[_arguments.length] = arguments[a];
		}
		i++;
	}
	let key = JSON.stringify(_arguments);
//	console.log('key', key);
	if(signals[key] === undefined) {
		signals[key] = {signal: new Signal('default'), counter: 1};
		let data = null;
		while (signals[key].counter > 0) {
			data = await fun.apply(this, _arguments);
			signals[key].counter--;
		}
		signals[key].value = data;
		signals[key].signal.state = 'ok';
//		console.log('run1', data);
		await sleep(10);
		delete signals[key];
		return data;
	} else {
		signals[key].counter=2;
		await signals[key].signal.until('ok');
		let data = signals[key].value;
//		console.log('run2', data);
		return data;
	}
};

module.exports = unite_last;