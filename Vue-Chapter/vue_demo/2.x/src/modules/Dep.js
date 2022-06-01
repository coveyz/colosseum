let uid = 0;

class Dep {
	constructor() {
		this.id = uid++;
		this.deps = new Set();
	}
	addDep(watcher) {
		this.deps.add(watcher);
	}
	depend() {
		// console.log('Dep-detail-depend', Dep.target);
		if (Dep.target) {
			Dep.target.addDep(this);
		}
	}
	notify() {
		this.deps.forEach((watcher) => watcher.update());
	}
}

module.exports = Dep;
