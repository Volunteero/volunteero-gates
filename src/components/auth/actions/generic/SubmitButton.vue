<template>
  <div class="six columns offset-by-three">
    <button
      type="button"
      class="button-primary u-full-width"
      @click="submitAuthForm">
      {{action}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    action: String,
  },
  methods: {
    submitAuthForm() {
      console.info('Form submission is triggered');
      const action = this.action || '';
      this.$emit('submit-form', action.toLowerCase());
    },
  },
};
</script>
