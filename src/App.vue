<template>
  <div id="app">
    <div id="top-bar">
      <h3>
        <router-link :to="'/'" class="no-underline">
          <span class="lnr lnr-earth"></span>
        </router-link>
      </h3>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.no-underline{
  text-decoration: none;
}

</style>
