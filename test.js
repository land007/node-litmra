const unite = require('./index');

var crawling = function(milliseconds) {
	return new Promise(async function(resolve, reject) {
		console.log('begin', milliseconds);
		setTimeout(() => {
			resolve(milliseconds);
		}, milliseconds);
	});
};
var reptile = function() {
	let a1 = async ()=> {
		let sss = await unite(crawling, 1000);
		console.log('a', sss);
	};
	a1();
	let a2= async ()=> {
		let sss = await unite(crawling, 1000);
		console.log('b', sss);
	};
	a2();
};

reptile();