const proxy = (vm, data) => {
	Object.keys(data).forEach((key) => {
		Object.defineProperty(vm, key, {
			get() {
				return vm['$data'][key];
			},
			set(newValue) {
				vm['$data'][key] = newValue;
			},
		});
	});
};

export default proxy;