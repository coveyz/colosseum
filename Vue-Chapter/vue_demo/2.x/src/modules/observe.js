const Dep = require('./Dep');

/**
 *
 * @param {Object} data
 */
export const observe = (data) => {
	if (typeof data !== 'object') return;

	new Observer(data);
};

class Observer {
	constructor(data) {
		if (Array.isArray(data)) {
			//todo
			console.log('array=>', data);
		} else {
			this.walk(data);
		}
	}
	walk(data) {
		Object.keys(data).forEach((key) => {
			defineReactive(data, key, data[key]);
		});
	}
}

const defineReactive = (data, key, val) => {
	observe(val);
	const dep = new Dep();
	// console.log('deps=>?', dep, key);
	Object.defineProperty(data, key, {
		get() {
			Dep.target && dep.addDep(Dep.target);
			return val;
		},
		set(newVal) {
			if (newVal !== val) {
				val = newVal;
				dep.notify();
				observe(val);
			}
		},
	});
};
