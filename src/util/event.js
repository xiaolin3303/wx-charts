// simple event implement

export default function Event () {
	this.events = {};
}

Event.prototype.addEventListener = function (type, listener) {
	this.events[type] = this.events[type] || [];
	this.events[type].push(listener);
}

Event.prototype.trigger = function (...args) {
	let type = args[0];
	let params = args.slice(1);
	if (!!this.events[type]) {
		this.events[type].forEach((listener) => {
			try {
				listener.apply(null, params);
			} catch (e) {
				console.error(e);
			}
		});
	}
}