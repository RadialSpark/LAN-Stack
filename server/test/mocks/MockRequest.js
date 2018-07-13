module.exports = class MockRequest {
	constructor (args) {
		this.values = {};
		for (const key in args) {
			this[key] = args[key];
		}	
	}

	get(key) {
		return this.values[key];
	}
}