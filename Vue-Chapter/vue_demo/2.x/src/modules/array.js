import { def } from '../utils/tools';

//* 初始化 数组原型
const arrayProto = Array.prototype;
//* 克隆一份
export const arrayMethods = Object.create(arrayProto);
console.log('arrayMethods=>', arrayMethods);

//* 数组 7个需要被覆盖的方法
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

methodsToPatch.forEach((method) => {
	//* 1.0 获取数组的原始方法
	const origin = arrayProto[method];
	//* 2.0 覆盖 + 拓展
	def(arrayMethods, method, function mutator(...args) {
		const result = origin.apply(this, args),
			ob = this._ob_;

		let inserted;

		switch (method) {
			case 'push':
			case 'unshift':
				inserted = args;
				break;
			case 'splice':
				inserted = args.slice(2);
				break;
		}
		if (inserted) {
			console.log('inserted=>', inserted, 'ob=>', ob);
			ob.observeArray(inserted);
		}
		ob.dep.notify();

		return result;
	});
});
