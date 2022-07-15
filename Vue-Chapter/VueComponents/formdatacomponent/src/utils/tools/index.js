import Vue from 'vue';

//* new Vue
export const create = (Comp, props) => {
	const vm = new Vue({
		render(h) {
			return h(Comp, { props });
		},
	}).$mount();

	document.body.append(vm.$el);

	const comp = vm.$children[0];
	console.log('comp=>', vm, comp);

	comp.remove = () => {
		document.body.removeChild(vm.$el);
		vm.$destroy();
	};

	return comp;
};

export const create_extend = (Comp, props) => {
	const Box = Vue.extend({
		render(h) {
			return h(Comp, { props });
		},
	});

	const vm = new Box().$mount();
	// console.log('box=>', Box, vm);

	document.body.append(vm.$el);

	const comp = vm.$children[0];

	comp.remove = () => {
		document.body.removeChild(vm.$el);
		vm.$destroy();
	};

	return comp;
};
