<template>
  <div class="container">
    <div class="section row">
      <h1>{{ msg }}</h1>
    </div>
    <div class="section row">
      <h4>{{ sub }}</h4>
    </div>
    <div class="section row">
      <p><i>Volunteero = Volunteer + Hero</i></p>
      <p>
        <router-link :to="'/auth/login'">Sign In</router-link>
        or
        <router-link :to="'/auth/register'">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Volunteero',
      sub: 'Helping you help the world',
    };
  },
};
</script>

