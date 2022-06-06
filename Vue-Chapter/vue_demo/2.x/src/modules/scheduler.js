import { nextTick } from './next-tick';

let has = {};
const queue = [];

let flushing = false;
let waiting = false;

let index = 0;

export const queueWatcher = (watcher) => {
	const id = watcher.id;
	console.log('queueWatcher=>init=.');

	//* 判断 当前是否已经入队 -> 判断id 是否存在 -> 没有才入队
	if (has[id] == null) {
		has[id] = true;

		if (!flushing) {
			queue.push(watcher);
		} else {
			//todo
			//*如果已经刷新，则根据其id拼接观察程序
			//* 如果已经超过其id，则将立即运行它。
			console.log('queueWatcher=>elese->');
			const i = queue.length - 1;

			while (i < index && queue[i]['id'] > watcher.id) {
				i--;
			}
			queue.splice(i + 1, 0, watcher);
		}

		if (!waiting) {
			waiting = true;
			nextTick(flushSchedulerQuue);
		}
	}

	console.log('queueWatcher=>end=.', has);
};

function resetSchedulerState() {
	has = {};
	index = queue.length = 0;
	flushing = waiting = false;
}

//* 刷新任务队列
function flushSchedulerQuue() {
	const getNow = Date.now();
	console.log('flushSchedulerQuue->init', getNow);
	let watch, id;

	//* queue[watcher] 排序
	queue.sort((a, b) => a.id - b.id);

	for (let index = 0; index < queue.length; index++) {
		watch = queue[index];
		id = watch['id'];
		has[id] = null;
		watch.run();
	}

	resetSchedulerState();

	console.log('flushSchedulerQuue->end');
}
