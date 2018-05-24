<template>
  <div id="login-action">
      <div class="row">
          <div class="six columns offset-by-three">
            <input type="button" class="button-primary u-full-width" :value="action"/>
          </div>
        </div>
      <div class="row">
        <div class="six columns offset-by-three">
          <p class="u-left-align">Have no memory of this place?
            <a @click.prevent="switchAction()" href="join/register">{{switchTip}}</a> :)</p>
        </div>
      </div>
  </div>
</template>

<script>
const actionSwitchEvent = {
  key: 'action-switch',
  value: 'register',
};

export default {
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
  },
};
</script>
