import Dep from './Dep';

class Watcher {
	constructor(vm, fn) {
		this.$vm = vm;
		this.$fn = fn;
		this.get();
	}
	get() {
		Dep.target = this;
		this.$fn.call(this);
		Dep.target = null;
	}
	update() {
		this.get();
	}
}

export default Watcher;
