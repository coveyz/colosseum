import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from './kstore';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		counter: 1,
	},
	getters: {
		doubleCounter(state) {
			console.log('state=>', state);
			// 计算剩余数量
			return state.counter * 2;
		},

		qq(state) {
			return state.counter * 3;
		},
	},
	mutations: {
		add(state) {
			state.counter++;
		},
	},
	actions: {
		add({ commit }) {
			setTimeout(() => {
				commit('add');
			}, 1000);
		},
	},
	modules: {},
});
