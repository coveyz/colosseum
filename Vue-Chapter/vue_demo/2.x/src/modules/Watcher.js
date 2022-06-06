import Dep from './dep';
import { queueWatcher } from './scheduler';

let uid = 0;

class Watcher {
	constructor(vm, fn) {
		this.$vm = vm;
		this.$fn = fn;
		this.depIds = new Set();
		this.newDepIds = new Set();
		this.newDeps = [];

		this.id = ++uid;

		this.get();
	}
	get() {
		Dep.target = this;
		this.$fn.call(this);
		Dep.target = null;
	}
	update() {
		// this.get();
		queueWatcher(this);
	}
	addDep(dep) {
		const id = dep.id;
		if (!this.newDepIds.has(id)) {
			this.newDepIds.add(id);
			this.newDeps.push(dep);
			if (!this.depIds.has(id)) {
				dep.addDep(this);
			}
		}
	}
	run() {
		this.get();
	}
}

export default Watcher;
