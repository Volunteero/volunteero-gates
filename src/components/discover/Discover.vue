<template>
  <div class="container">
    <div class="section row">
      <div class="six columns offset-by-three">
        <input class="u-full-width" type="text" placeholder="I am interested in...">
      </div>
    </div>
    <div class="row">
      <div v-for="category in search.categories" :key="category.name">
        {{category}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Discover',
  data() {
    return {
      search: {
        categories: [
          {
            name: 'events',
            selected: false,
          },
          {
            name: 'campaigns',
            selected: false,
          },
          {
            name: 'organizations',
            selected: false,
          },
        ],
      },
    };
  },
};
</script>

