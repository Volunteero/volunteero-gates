import Mediator from './Mediator';

class AuthPayload {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  /**
   * returns the payload data in API expected format
   */
  getData() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}

export default class AuthMediator extends Mediator {
  constructor(requester) {
    super(requester);

    this.AUTH_SERVICE_URL = 'https://tmmi8qejaj.execute-api.eu-central-1.amazonaws.com/dev/';
    this.ACTIONS = {
      register: {
        resource: 'auth/register',
        method: 'post',
      },
      login: {
        resource: 'auth/login',
        method: 'post',
      },
    };
  }

  registerUser(username, password) {
    const endpoint = Mediator.getFullUrl(
      this.AUTH_SERVICE_URL,
      this.ACTIONS.register,
    );
    const authPayload = new AuthPayload(username, password);
    const options = Mediator.prepareRequest(
      endpoint.url,
      endpoint.method,
      authPayload,
    );

    // FIXME: make generic
    return this.requestFunction(options).then((response) => {
      console.log(response);
      return response;
    }).catch((error) => {
      console.error(error);
      return [];
    });
  }

  loginUser(username, password) {
    const endpoint = Mediator.getFullUrl(
      this.AUTH_SERVICE_URL,
      this.ACTIONS.login,
    );
    const authPayload = new AuthPayload(username, password);
    const options = Mediator.prepareRequest(
      endpoint.url,
      endpoint.method,
      authPayload,
    );

    // FIXME: make generic
    return this.requestFunction(options).then((response) => {
      console.log(response);
      return response;
    }).catch((error) => {
      console.error(error);
      return [];
    });
  }

  registerUserAndLogin(username, password) {
    this.registerUser(username, password).then(result => result);
  }
}
