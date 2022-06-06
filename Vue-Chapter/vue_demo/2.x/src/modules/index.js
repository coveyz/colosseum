import { observe } from './observe';
import proxy from './proxy';
import Watcher from './watcher';

class CVue {
	constructor(op) {
		this.$options = op;
		this.$data = op.data || {};

		observe(this.$data);
		// console.log('data=?', this.$data);
		proxy(this, this.$data);
		// console.log('vm=>', this);
		this.$mount(op.el);
	}
	$mount(el) {
		this.$el = document.querySelector(el);
		// console.log('$el=>', this.$el);

		const updateComponent = () => {
			const { render } = this.$options;
			const vnode = render.call(this, this.$creatElement);
			// console.log('vnode=?', vnode);
			this._update(vnode);
		};

		new Watcher(this, updateComponent);
	}
	$creatElement(tag, props, children) {
		return { tag, props, children };
	}
	_update(vnode) {
		const preVnode = this._vnode;

		if (preVnode) {
			//todo
			// console.log('update');
			this._patch(preVnode, vnode);
		} else {
			this._patch(this.$el, vnode);
		}
	}
	_patch(oldVnode, vnode) {
		if (oldVnode.nodeType) {
			const parent = oldVnode.parentElement,
				refElm = oldVnode.nextSibling;
			// console.log('init=>parenet=>', parent);
			// console.log('init=>refElm=>', refElm);
			const el = this.createElm(vnode);
			parent.insertBefore(el, refElm);
			parent.removeChild(oldVnode);
		} else {
			// console.log('_patch-update');
			const el = (vnode.el = oldVnode.el);
			// console.log('old=>', oldVnode);
			// console.log('new=>', vnode);
			if (oldVnode.tag === vnode.tag) {
				const oldChild = oldVnode.children,
					vnodeChild = vnode.children;
				if (typeof vnodeChild === 'string') {
					el.textContent = vnodeChild;
				} else {
					if (typeof oldChild === 'string') {
						el.innerHTML = '';
						vnode.forEach((child) => {
							el.append(this.createElm(child));
						});
					} else {
						this.updateChild(el, oldChild, vnodeChild);
					}
				}
			}
		}

		this._vnode = vnode;
	}
	createElm(vnode) {
		const el = document.createElement(vnode.tag);
		// console.log('createElm=>', el);
		for (const key in vnode.props) {
			console.log('props-key=> ', key);
			el.setAttribute(key, vnode['props'][key]);
		}
		// console.log('xxx-elm=>', el);

		if (typeof vnode.children === 'string') {
			el.textContent = vnode.children;
		} else {
			vnode['children'].forEach((child) => {
				el.append(this.createElm(child));
			});
		}

		vnode.el = el;
		return el;
	}
	updateChild(el, oldChild, vnodeChild) {
		const len = Math.min(oldChild.length, vnodeChild.length);
		// console.log('update->len-?', len, oldChild, vnodeChild);
		for (let index = 0; index < len; index++) {
			this._patch(oldChild[index], vnodeChild[index]);
		}

		if (oldChild.lenthg < vnodeChild.length) {
			vnode.forEach((child) => {
				el.append(this.createElm(child));
			});
		}
		//* 删除
		if (oldChild.length > vnodeChild.length) {
			oldChild.forEach((child) => {
				el.removeChild(child);
			});
		}
	}
}

module.exports = CVue;
