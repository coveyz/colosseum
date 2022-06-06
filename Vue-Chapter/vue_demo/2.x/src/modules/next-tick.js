const callbacks = [];
let pending = false;
let timeFunc;

function flushCallbacks() {
	console.log('flushCallbacks-init');
	pending = false;
	const copies = callbacks.slice(0);
	callbacks.length = 0;

	for (let i = 0; i < copies.length; i++) {
		copies[i]();
	}

	console.log('flushCallbacks-end');
}

if (typeof Promise !== undefined) {
	console.log('timeFunc-init');
	const p = Promise.resolve();
	timeFunc = () => {
		p.then(flushCallbacks);
	};
	console.log('timeFunc-end');
} else {
	timeFunc = () => {
		setTimeout(flushCallbacks, 0);
	};
}

export function nextTick(cb, ctx) {
	console.log('next_tick_init->');
	callbacks.push(() => {
		if (cb) {
			try {
				cb.call(ctx);
			} catch (error) {
				console.log('next_tick_error=>', error, ctx);
			}
		} else {
			console.log('xxx=>cb-xxx->', cb);
		}
	});
	console.log('callback->', callbacks);

	if (!pending) {
		pending = true;
		timeFunc();
	}

	console.log('next_tick_end');
}
