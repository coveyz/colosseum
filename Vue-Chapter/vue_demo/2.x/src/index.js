const CVue = require('./modules/index');

const app = new CVue({
	el: '#app',
	data: {
		// counter: 1,
		arr: [1, 2, 3],
		// obj: {
		// 	name: 1212,
		// 	text: {
		// 		item: 'obj-children',
		// 	},
		// },
	},
	render(h) {
		// const d1 = document.createElement('div')
		// d1.id = 'app'
		// d1.textContent = this.counter
		// return d1
		return h(
			'div',
			{
				id: 'app',
			},
			// this.counter + ''
			[
				// h('p', null, this.counter + ''),
				// h('p', null, this.counter * 2 + ''),
				// h('p', null, this.counter * 3 + ''),
				h('p', null, this.arr + ''),
			]
			// [h('p', null, this.arr + '')]
		);
	},
});

// setTimeout(() => {
// 	app.counter++;
// }, 1000);

// setInterval(() => {
//   app.counter += 1
// }, 1000);
// let qq = 0;
// const timer = setInterval(() => {
// 	app.arr.push(Math.random().toFixed(1));
// 	qq++;
// 	// app.counter += 1;
// 	if (qq >= 3) {
// 		clearInterval(timer);
// 	}
// }, 1000);

setTimeout(() => {
	app.arr.push(44);
}, 1000);
