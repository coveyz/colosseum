let Vue;

class Store {
	constructor(op) {
		this.$options = op;
		const computed = {};
		const wrapperGetters = op.getters;
		this.getters = {};

		Object.keys(wrapperGetters).forEach((key) => {
			const fn = wrapperGetters[key];
			computed[key] = () => {
				return fn(op.state);
			};

			Object.defineProperty(this.getters, key, {
				get: () => {
					return this._vm[key];
				},
			});
		});

		this._vm = new Vue({
			data: {
				$$state: op.state,
			},
			computed,
		});

		this.commit = this.commit.bind(this);
		this.actions = this.commit.bind(this);
	}
	get state() {
		return this._vm['_data']['$$state'];
	}
	set state(_val) {
		throw Error('需要通过 commit 进行修改');
	}
	commit(type, payload) {
		const fn = this.$options['mutations'][type];
		if (!fn) {
			throw Error('type 不存在s');
		}

		fn && fn(this.state, payload);
	}
	dispatch(type, payload) {
		const fn = this.$options['actions'][type];
		if (!fn) {
			throw Error('type 不存在s');
		}

		fn && fn(this, payload);
	}
}

function install(_Vue) {
	Vue = _Vue;

	Vue.mixin({
		beforeCreate() {
			if (this.$options.store) {
				Vue.prototype.$store = this.$options.store;
			}
		},
	});
}

export default { Store, install };
