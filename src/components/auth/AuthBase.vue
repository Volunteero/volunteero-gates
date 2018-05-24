<template>
  <div class="container section">

      <div id="sectionTitle" class="row">
        <div class="six columns offset-by-three">
          <h4 class="u-left-align">{{currentSectionTitle}}</h4>
        </div>
      </div>


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

      <div id="authentication-action">
        <component
          v-bind:is="currentActionComponent"
          @action-switch="onActionSwitch"
          ></component>
      </div>
  </div>
</template>

<script>
import LoginAction from './actions/LoginAction';
import RegisterAction from './actions/RegisterAction';

export default {
  // mixins: [WindowEvents],
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
      auth: { email: '', password: '' },
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
  },
};
</script>
