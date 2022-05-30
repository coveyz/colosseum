const { def } = require('../utils/tools');
const Dep = require('./Dep');
const { arrayMethods } = require('./array');

/**
 *
 * @param {Object} data
 */
export const observe = (data) => {
	if (typeof data !== 'object') return;
	let ob = new Observer(data);
	return ob;
};

/**
 ** 通过拦截 来拓展 目标数组 或者 对象
 ** 通过使用 __proto__
 * @param {*} target
 * @param {object} src
 */
const protoAugment = (target, src) => {
	target.__proto__ = src;
};

export class Observer {
	constructor(data) {
		this.dep = new Dep();
		this.value = data;
		def(data, '_ob_', this);
		this.vmCount = 0;
		if (Array.isArray(data)) {
			protoAugment(data, arrayMethods);
			this.observeArray(data);
		} else {
			this.walk(data);
		}
	}
	/**
	 ** 将所有属性转换为
	 ** getter / setter， 只有在一下情况下会调用
	 ** 值为 object
	 * @param {object} data
	 */
	walk(data) {
		Object.keys(data).forEach((key) => {
			defineReactive(data, key, data[key]);
		});
	}
	/**
	 ** 观察数组 项
	 * @param {Array<any>} items
	 */
	observeArray(items) {
		for (let index = 0; index < items.length; index++) {
			observe(items[index]);
		}
	}
}

/**
 ** 触发数组时， 收集对数组元素的依赖关系，
 ** 因为不能像属性 获取程序那样拦截元素访问
 * @param {Array<any>} value
 */
const dependArray = (value) => {
	for (let e, i = 0, l = value.length; i < l; i++) {
		e = value[i];
		e && e_ob_;
		if (Array.isArray(e)) {
			dependArray(e);
		}
	}
};

const defineReactive = (data, key, val) => {
	observe(val);
	const dep = new Dep();
	// console.log('deps=>?', dep, key);
	Object.defineProperty(data, key, {
		get() {
			// Dep.target && dep.addDep(Dep.target);
			console.log('Dep=?', Dep.target);
			if (Dep.target) {
				dep.addDep(Dep.target);
				console.log('isArraydata=>', Dep.target, data);
				if (Array.isArray(data)) {
					console.log('isArraydata=>', data, key);
					dependArray(data);
				}
			}
			return val;
		},
		set(newVal) {
			if (newVal !== val) {
				val = newVal;
				console.log('defineReactive=>', val);
				dep.notify();

				observe(val);
			}
		},
	});
};
