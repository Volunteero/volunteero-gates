<template>
  <div id="register-action">
      <div class="row">
          <div class="six columns offset-by-three">
            <input type="button" class="button-primary u-full-width" :value="action"/>
          </div>
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
const actionSwitchEvent = {
  key: 'action-switch',
  value: 'login',
};

export default {
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
  },
};
</script>
