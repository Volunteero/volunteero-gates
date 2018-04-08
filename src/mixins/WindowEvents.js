/* eslint-disable-next-line no-unused-vars  */
const WindowEvents = {
  methods: {
    emit(message) {
      console.info(`>>> EMMITTED EVENT: ${message}`);
      // alert(message);
      window.dispatchEvent(new Event(message));
    },
    subscribe(message, callback) {
      window.addEventListener(message, callback);
    },
  },
};

export default WindowEvents;
