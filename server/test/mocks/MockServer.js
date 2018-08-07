'use strict';

module.exports = class MockServer {
  /**
   * @description default constructor -- initializes all internal vars to
   * empty objects/arrays or false
   */
  constructor() {
		this.isAuthEnabled = false;
		this.enabledValues = {};
		this.middleware = [];
		this.engines = {};
		this.urlHandlers = {};
		this.setValues = {};
	}

  /**
   * @description Mock implementation of the enableAuth method
   */
	enableAuth() {
		this.isAuthEnabled = true;
	}

  /**
   * @description Mock implementation of the enable method
   * @param {String} name the name of the setting
   */
	enable(name) {
		this.enabledValues[name] = true;
	}

  /**
   * @description Mock implementation of the enabled method
   * @param {String} name the name of the setting
   * @return {Boolean}
   */
	enabled(name) {
		return this.enabledValues[name] || false;
	}

  /**
   * @description Mock implementation of the use method
   * @param {Function} middleware middlware to be used
   */
	use(middleware) {
		this.middleware.push(middleware);
	}

  /**
   * @description Mock implementation of the engine method
   * @param {String} engineName the key of the engine to be set
   * @param {Object} engine The engine object or function to be used
   */
	engine(engineName, engine) {
		this.engines[engineName] = engine;
	}

  /**
   * @description Mock implementation of the set method
   * @param {String} key The key of the state variable to be set
   * @param {Any} value the value to be stored
   */
	set(key, value) {
		this.setValues[key] = value;
	}

  /**
   * @description Mock implementation of the get method
   * @param {String} key the key, or url, for the handler
   * @param {Function} value the function to be called for the provided value
   */
	get(key, value) {
		this.urlHandlers[key] = value;
	}
};
