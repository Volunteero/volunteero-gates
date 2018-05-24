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

    this.AUTH_SERVICE_URL = 'https://volunteero-auth.herokuapp.com/';
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

    return this.issueRequest(options);
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

    console.log(options);
    return this.issueRequest(options);
  }

  registerUserAndLogin(username, password) {
    return this.registerUser(username, password).then(result => result);
  }
}
