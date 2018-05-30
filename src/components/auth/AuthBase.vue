<template>
  <div class="container section">

      <div id="sectionTitle" class="row">
        <div class="six columns offset-by-three">
          <h4 class="u-left-align">{{currentSectionTitle}}</h4>
        </div>
      </div>

      <form :id="authFormId">
        <div class="row">
            <div class="six columns offset-by-three">
            <label for="">E-mail:</label>
            <input class="u-full-width"  v-model="auth.username" type="email" required>
          </div>
        </div>
        <div class="row">
          <div class="six columns offset-by-three">
            <label for="">Password</label>
            <input class="u-full-width" v-model="auth.password" type="password" required>
          </div>
        </div>

        <div id="authentication-action">
          <component
            :is="currentActionComponent"
            :auth="auth"
            :form="authFormId"
            @action-switch="onActionSwitch"
            @auth-result="onAuthResult"
            ></component>
        </div>
      </form>
  </div>
</template>

<script>
import LoginAction from './actions/LoginAction';
import RegisterAction from './actions/RegisterAction';
import Token from './actions/lib/Token';

/* Mixins */
import JwtManager from '../../mixins/JwtManager';

export default {
  mixins: [JwtManager],
  data() {
    return {
      // the action component dictionary
      authOptions: {
        login: {
          title: 'Log In',
          component: LoginAction,
        },
        register: {
          title: 'Register',
          component: RegisterAction,
        },
        current: {},
      },
      // the handled data
      auth: { username: '', password: '' },
      authFormId: 'authForm',
      user: {},
    };
  },
  /**
   * Registers the component to be the login action by default
   */
  created() {
    console.info('AuthBase component created');
    this.authOptions.current = this.authOptions.login;
  },
  computed: {
    currentSectionTitle() {
      return this.authOptions.current.title || '';
    },
    currentActionComponent() {
      return this.authOptions.current.component || {};
    },
  },
  methods: {
    onActionSwitch(newActionValue) {
      const selection = this.authOptions[newActionValue] || {};
      if (selection !== {}) {
        console.info(`Switching to: ${newActionValue}`);
        this.authOptions.current = selection;
      } else {
        console.warn(
          `Attempted to switch to ${newActionValue}, but such option is not found`,
        );
      }
    },
    onAuthResult(result) {
      console.info('Handling auth result');
      console.log(result);
      if (result === null) {
        console.warn('Received a null response');
        return;
      }
      const data = result.data;
      if (data.success === true || data.success === 'true') {
        if (typeof data.accessToken === 'string' && data.accessToken !== '') {
          const token = data.accessToken;
          console.log('Received access token');
          console.log(token);
          this.saveAuthData(token);
        }
      }
    },
    saveAuthData(token) {
      this.token = token;
      // parseJwtData method comes from the mixin
      const tokenData = this.parseJwtData(token);
      const tokenObject = new Token(token, tokenData);
      this.$cookie.set('token', token, { expires: tokenObject.getExpirationDate() });
    },
  },
};
</script>
