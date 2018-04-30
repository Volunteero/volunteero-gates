<template>
<div class="container section">
    <div class="row">
      <div class="six columns offset-by-three">
        <h4 class="u-left-align">Log In</h4>
      </div>
    </div>
    <form @submit.prevent="authenticate()" class="">
      <div class="row">
         <div class="six columns offset-by-three">
          <label for="">E-mail:</label>
          <input class="u-full-width"  v-model="auth.email" type="email" required>
        </div>
      </div>
      <div class="row">
        <div class="six columns offset-by-three">
          <label for="">Password</label>
          <input class="u-full-width" v-model="auth.password" type="password" required>
        </div>
      </div>
      <div class="row">
        <div class="six columns offset-by-three">
          <button class="u-full-width" type="submit">Login</button>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="six columns offset-by-three">
        <p class="u-left-align">Have no memory of this place?
          <router-link :to="'/auth/register'">Register</router-link> :)</p>
      </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import WindowEvents from '../../../mixins/WindowEvents';

export default {
  data() {
    return {
      PATH: 'http://demo8679439.mockable.io/auth/login',
      auth: { email: '', password: '' },
      user: {},
    };
  },
  mixins: [WindowEvents],
  methods: {
    /**
     * Attempts to authenticate the user
     *
     * @return {mixed}
     */
    authenticate() {
      const credentials = this.auth;
      axios
        .post(this.PATH, credentials)
        .then((response) => {
          console.log(response);
          // save the received token
          window.localStorage.setItem(
            'accessToken',
            response.data.accessToken,
          );
          window.localStorage.setItem(
            'refreshToken',
            response.data.refreshToken,
          );

          // TODO: emit event for succesful login
          this.$swal('Logged in!');
          console.info(this);
          this.emit('LOGGED_IN');
        })
        .catch((errors) => {
          // catch errors
          console.error(errors);
          this.emit('AUTHORIZATION_ERROR');
        });
    },
  },
};
</script>
