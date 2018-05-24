<template>
  <div id="register-action">
      <div class="row">
          <submit-button
            :action="action"
            @submit-form="submitForm"
            ></submit-button>
      </div>
      <div class="row">
        <div class="six columns offset-by-three">
          <p class="u-left-align">This page seems familiar?
            <a @click.prevent="switchAction()" href="join/login">{{switchTip}}</a> :)</p>
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
  value: 'login',
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
      action: 'Register',
      switchTip: 'Login',
      user: {},
    };
  },
  methods: {
    switchAction() {
      console.info('Switch action called');
      this.$emit(actionSwitchEvent.key, actionSwitchEvent.value);
    },
    submitForm(action) {
      console.log(`Submitting form with action: ${action}`);
      try {
        const validForm = FormController.checkFormValidity(document, this.form);
        if (validForm) {
          console.log('form content is ok');
          this.register();
        } else {
          console.warn('form content is not valid');
        }
      } catch (error) {
        console.error('Form submission error');
        console.error(error);
      }
    },
    register() {
      console.log('Register method called');
      const am = new AuthMediator(axios);
      console.log(am);
      const username = this.auth.username;
      const password = this.auth.password;
      if (username && password) {
        am.registerUserAndLogin(username, password).then((result) => {
          console.log(result);
        });
      }
    },
  },
};
</script>
