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
	console.log('comp=>', comp, vm);

	comp.remove = () => {
		document.body.removeChild(vm.$el);
		vm.$destroy();
	};

	return comp;
};
