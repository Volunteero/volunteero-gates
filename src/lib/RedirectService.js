export default class RedirectService {
  constructor() {
    this.routes = {
      CLIENT_APP: {
        base: 'https://volunteero-front-end-base.herokuapp.com/',
      },
    };
  }

  /**
   * Returns a route with the query string from internal route table
   * returns a valid url if found and null if the route with key is not known
   * @param {String} key
   * @return {String | null}
   */
  getUrl(key, ...queryParams) {
    const route = this.routes[key];
    console.log(route);
    // TODO: use a better existance check
    if (route) {
      const queryArray = queryParams.map(q => `${q.key}=${q.value}`);
      const queryString = (queryArray.length > 0) ? queryArray.join('&') : '';
      const querySuffix = (queryString === '') ? '' : `?${queryString}`;
      return `${route.base}${querySuffix}`;
    }
    return null;
  }
}
