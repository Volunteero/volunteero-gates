/* eslint-disable-next-line no-unused-vars  */
const WindowEvents = {
  methods: {
    /**
     * Parses the JWT token for data and returns a resolved object.
     * If the token is not resolvable, returns empty Object.
     * @param {String} jwtToken
     * @return {Object}
     */
    parseJwtData(jwtToken) {
      console.info(`>>> PARSING THE TOKEN EVENT: ${jwtToken}`);
      // Parses the base64 encoded jwt token to JSON string, to JSON
      try {
        if (jwtToken) return JSON.parse(atob(jwtToken.split('.')[1]));
        return {};
      } catch (err) {
        console.err(err);
        return {};
      }
    },
  },
};

export default WindowEvents;
