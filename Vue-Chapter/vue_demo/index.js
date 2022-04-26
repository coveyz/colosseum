class CVue {
	constructor(op) {
		this.$options = op;
		this.$data = op.data;
		this.$mehods = op.methods;
		observe(this.$data);
		proxy(this);
		new Complie(op.el, this);
	}
}

const proxy = (vm) => {
	Object.keys(vm.$data).forEach((key) => {
		Object.defineProperty(vm, key, {
			get() {
				return vm['$data'][key];
			},
			set(newVal) {
				vm['$data'][key] = newVal;
			},
		});
	});
};

const observe = (obj) => {
	if (typeof obj !== 'object') return;
	new Observer(obj);
};

class Observer {
	constructor(data) {
		if (Array.isArray(data)) {
			console.log('array-todo');
		} else {
			this.walk(data);
		}
	}
	walk(obj) {
		Object.keys(obj).forEach((key) => {
			defineReactive(obj, key, obj[key]);
		});
	}
}

const defineReactive = (obj, key, val) => {
	observe(val);
	const dep = new Dep();
	Object.defineProperty(obj, key, {
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

class Dep {
	constructor() {
		this.deps = [];
	}
	addDep(watcher) {
		this.deps.push(watcher);
	}
	depDetail() {
		console.log('depDetail=>', this.deps);
	}
	notify() {
		this.deps.map((watcher) => watcher.update());
	}
}

class Watcher {
	constructor(vm, key, fn) {
		this.$vm = vm;
		this.$key = key;
		this.$fn = fn;

		Dep.target = this;
		this.$vm[key];
		Dep.target = null;
	}
	update() {
		this.$fn.call(this.$vm, this.$vm[this.$key]);
	}
}

class Complie {
	constructor(el, vm) {
		this.$el = document.querySelector(el);
		this.$vm = vm;
		this.compile(this.$el);
	}
	compile(el) {
		el.childNodes.forEach((node) => {
			if (node.nodeType === 1) {
				this.compileElement(node);
				if (node.childNodes && node.childNodes.length) {
					this.compile(node);
				}
			} else if (this.isInter(node)) {
				this.compileText(node);
			}
		});
	}
	isInter(node) {
		return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
	}
	compileText(node) {
		// node.textContent = this.$vm[RegExp.$1];
		this.update(node, RegExp.$1, 'text');
	}
	compileElement(node) {
		Array.from(node.attributes).forEach((attr) => {
			const { name, value } = attr;
			if (name.startsWith('k-')) {
				const dir = name.substring(2);
				// console.log('dir=<', dir);
				this[dir] && this[dir](node, value);
			} else if (name.startsWith('@')) {
				// console.log('node-event=.', name);
				const eventName = name.substring(1);
				this.handleEvent(node, eventName, value);
			}
		});
	}
	handleEvent(node, eventName, exp) {
		const fn = this.$vm['$mehods'][exp];
		console.log(eventName, exp, fn);
		node.addEventListener(eventName, () => {
			fn && fn.call(this);
		});
	}
	text(node, exp) {
		// node.textContent = this.$vm[exp];
		this.update(node, exp, 'text');
	}
	textUpdater(node, val) {
		node.textContent = val;
	}
	html(node, exp) {
		// node.innerHTML = this.$vm[exp];
		this.update(node, exp, 'html');
	}
	htmlUpdater(node, val) {
		node.innerHTML = val;
	}
	model(node, exp) {
		this.update(node, exp, 'model');
		node.addEventListener('input', (e) => {
			this.$vm[exp] = e.target.value;
		});
	}
	modelUpdater(node, val) {
		// console.log('xxx=>', node.value);
		node.value = val;
	}
	update(node, exp, dir) {
		const fn = `${dir}Updater`;
		this[fn] && this[fn](node, this.$vm[exp]);
		new Watcher(this.$vm, exp, (val) => {
			// console.log('exp=>', fn);
			this[fn](node, val);
		});
	}
}
