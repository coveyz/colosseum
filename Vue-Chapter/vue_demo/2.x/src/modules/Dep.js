class Dep {
	constructor() {
		this.deps = new Set();
	}
	addDep(watcher) {
		this.deps.add(watcher);
	}
	depDetail() {
		console.log('dep-detail=>', this.deps);
	}
	notify() {
		console.log('dep-notify=>', this.deps);
		this.deps.forEach((watcher) => watcher.update());
	}
}

module.exports = Dep;
