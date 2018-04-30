<template>
  <div class="container">

    <!-- Caption phrase -->
    <div class="section row u-left-align">
      <div class="6 columns offset-by-one">
        <h1>{{ msg }}</h1>
        <h4>{{ sub }}</h4>
      </div>
    </div>

    <!-- Auth / Discover incentives -->
    <div class="section row u-left-align">
      <div class="6 columns offset-by-one">
        <!-- <p><i>Volunteero = Volunteer + Hero</i></p> -->
        <p>
          <router-link :to="'/auth/login'">Join us</router-link>
          or
          <router-link :to="'/discover'">discover</router-link>
          the community
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {
      msg: 'Volunteero',
      sub: 'Helping you help the world',
    };
  },
};
</script>

