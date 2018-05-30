

export default class Token {
  /**
   * Creates a new token object
   * @param {String} tokenString
   * @param {Object} param1
   */
  constructor(tokenString, { id = '', username = '', exp = '', iat = '' }) {
    this.tokenString = tokenString;
    this.id = id;
    this.username = username;
    this.expiresAt = exp;
    this.issuedAt = iat;
    this.TMSTAMP_FACTOR = 1000;
  }

  /**
   * Returns the correct date from the token exp timestamp
   * @return {Date}
   */
  getExpirationDate() {
    return new Date(this.normalizeTimeStamp(this.expiresAt));
  }

  /**
   * Returns the correct date representation of the token iat timestamp
   * @return {Date}
   */
  getIssuedAtDate() {
    return new Date(this.normalizeTimeStamp(this.issuedAt));
  }

  /**
   * Factors the timestamp to correct representation in JS
   * @param {number} timestamp
   */
  normalizeTimeStamp(timestamp) {
    return timestamp * this.TMSTAMP_FACTOR;
  }
}
