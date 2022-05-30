import CVue from './modules/index';

const app = new CVue({
	el: '#app',
	data: {
		counter: 1,
		obj: {
			name: 1212,
			text: {
				item: 'obj-children',
			},
		},
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
			[h('p', null, this.counter + ''), h('p', null, this.counter * 2 + ''), h('p', null, this.counter * 3 + '')]
		);
	},
});

setTimeout(() => {
	app.counter++;
}, 1000);
// setInterval(() => {
//   app.counter += 1
// }, 1000);
