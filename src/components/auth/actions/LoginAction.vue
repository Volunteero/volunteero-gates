<template>
  <div id="login-action">
      <div class="row">
          <submit-button
            :action="action"
            @submit-form="submitForm"
            ></submit-button>
      </div>
      <div class="row">
        <div class="six columns offset-by-three">
          <p class="u-left-align">Have no memory of this place?
            <a
              @click.prevent="switchAction()"
              href="join/register">
              {{switchTip}}
            </a> :)</p>
        </div>
      </div>
  </div>
</template>

<script>
import AuthMediator from '@/lib/AuthMediator';
import SubmitButton from './generic/SubmitButton';
import FormController from './lib/FormController';

const axios = require('axios');

const actionSwitchEvent = {
  key: 'action-switch',
  value: 'register',
};

export default {
  components: {
    SubmitButton,
  },
  props: {
    auth: Object,
    form: String,
  },
  data() {
    return {
      action: 'Login',
      switchTip: 'Register',
      user: {},
    };
  },
  methods: {
    switchAction() {
      console.info('Action switch event emitted');
      this.$emit(actionSwitchEvent.key, actionSwitchEvent.value);
    },
    submitForm(action) {
      console.log(`Submitting form with action: ${action}`);
      try {
        const validForm = FormController.checkFormValidity(document, this.form);
        if (validForm) {
          console.log('ok');
          this.login();
        } else {
          console.warn('not ok');
        }
      } catch (error) {
        console.error('Form submission error');
        console.error(error);
      }
    },
    login() {
      console.log('Login method called');
      const am = new AuthMediator(axios);
      console.log(am);
      const username = this.auth.username;
      const password = this.auth.password;
      if (username && password) {
        am.loginUser(username, password).then((result) => {
          console.log('Login result received');
          console.log(result);
          this.$emit('auth-result', result);
        }).catch((error) => {
          console.error('Registration failed:');
          console.log(error);
          this.$emit('auth-error', error);
        });
      }
    },
  },
};
</script>
