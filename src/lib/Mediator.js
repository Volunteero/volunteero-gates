export default class Mediator {
  /**
   * Adds the requester to be available class-wide
   * @param {Object | Function} requester
   */
  constructor(requester) {
    this.requestFunction = requester;
  }

  /**
   * Sends the request with the options.
   * Catches errors internally and
   * resolves to null in case of any
   * @param {Object} options
   * @returns {Promise.<Object | null>}
   */
  issueRequest(options) {
    return this.requestFunction(options).then((response) => {
      console.log(response);
      return response;
    }).catch((error) => {
      console.error(error);
      return null;
    });
  }

  /**
   * Forms the request options from the provided parameters.
   * Uses the getData() method of the payload to append the data
   * in a format expected by the API
   * @param {String} reqUrl
   * @param {String} reqMethod
   * @param {Object} payload
   * @param {Function} payload.getData
   * @return {Object}
   */
  static prepareRequest(reqUrl, reqMethod, payload = {}) {
    const options = {
      url: reqUrl,
      method: reqMethod,
    };
    if (typeof payload.getData() === 'function') {
      options.data = payload.getData();
    }
    return options;
  }

  /**
   * Concatenates the action resource into the full url and returns an object
   * with the *url* and the http *method*
   * @param {Object} action
   * @returns {Object}
   */
  static getFullUrl(host, action) {
    const resource = action.resource;
    const method = action.method;
    const url = `${host}${resource}`;
    return { url, method };
  }
}
