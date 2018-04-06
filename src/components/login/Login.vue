<template>
<div class="container">
    <form @submit.prevent="authenticate()">
      <div class="row">
        <label for="">E-mail:</label>
        <input v-model="auth.email" type="email" required>
      </div>
      <div class="row">
        <label for="">Password</label>
        <input v-model="auth.password" type="password" required>
      </div>
      <div class="row">
        <button type="submit">Login</button>
      </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      auth: { email: '', password: '' },
      user: {},
    };
  },
  methods: {
    /**
     * Attempts to authenticate the user
     *
     * @return {mixed}
     */
    authenticate() {
      const credentials = this.auth;
      axios
        .post('http://demo8679439.mockable.io/auth/login', credentials)
        .then((response) => {
          console.log(response);
          /**
           * Now that we successfully retrieved the token and the user information
           * we have a couple of options:
           *
           *     1) Save the token in local storage
           *         - Keeps the token saved even when the browser is closed
           *     2) Save the token in session storage
           *         - Deletes the token when user closes the browser or even the tab
           *     3) Save the token in a cookie
           *
           *  Both local and session storage api are the same so I'll use the local storage
           *  for the sake of the example
           *
           */
          window.localStorage.setItem('token', response.data.token);
          window.localStorage.setItem(
            'auth-user',
            JSON.stringify(response.data.user),
          );

          // emit event for succesful login
          this.$swal('Logged in!');
        })
        .catch((errors) => {
          // catch errors
          console.error(errors);
        });
    },
  },
};
</script>
