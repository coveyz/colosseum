let Vue;
class VueRouter {
	constructor(op) {
		this.$options = op;
		let init = window.location.hash.slice(1) || '/';
		Vue.util.defineReactive(this, 'current', init);
		Vue.util.defineReactive(this, 'matched', []);

		window.addEventListener('hashchange', () => {
			this.current = window.location.hash.slice(1) || '/';
			this.matched = [];
			this.match();
		});
		this.match();
	}
	match(routes) {
		routes = routes || this.$options.routes;

		for (const router of routes) {
			if (router.path === '/' && this.current === '/') {
				this.matched.push(router);
				return;
			}
			if (router.path !== '/' && this.current.indexOf(router.path) > -1) {
				this.matched.push(router);
				if (router.children && router.children.length) {
					this.match(router.children);
				}
				return;
			}
		}
	}
}

VueRouter.install = function (_Vue) {
	Vue = _Vue;

	Vue.mixin({
		beforeCreate() {
			if (this.$options && this.$options.router) {
				Vue.prototype.$router = this.$options.router;
			}
		},
	});

	Vue.component('router-link', {
		props: {
			to: {
				type: String,
				required: true,
			},
		},
		render(h) {
			return h('a', { attrs: { href: `#${this.to}` } }, this.$slots.default);
		},
	});
	Vue.component('router-view', {
		render(h) {
			this.$vnode.data.routerView = true;
			let dept = 0,
				parent = this.$parent;

			while (parent) {
				const routerData = parent.$vnode && parent.$vnode.data;
				if (routerData && routerData.routerView) {
					dept += 1;
				}
				parent = parent.$parent;
			}

			let component = null,
				router = this.$router.matched[dept];

			if (router) {
				component = router.component;
			}

			return h(component);
		},
	});
};

export default VueRouter;
