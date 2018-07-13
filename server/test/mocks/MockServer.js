module.exports = class MockServer {
	constructor() {
		this.isAuthEnabled = false;
		this.enabledValues = {};
		this.middleware = [];
		this.engines = {};
		this.urlHandlers = {};
		this.setValues = {};
	}

	enableAuth() {
		this.isAuthEnabled = true;
	}
	
	enable(name) {
		this.enabledValues[name] = true;
	}
	
	enabled(name) {
		return this.enabledValues[name] || false;
	}
	
	use(middleware) {
		this.middleware.push(middleware);
	}
	
	engine(engineName, engine) {
		this.engines[engineName] = engine;
	}
	
	set(key, value) {
		this.setValues[key] = value;
	}
	
	get(key, value) {
		this.urlHandlers[key] = value;
	}
}
