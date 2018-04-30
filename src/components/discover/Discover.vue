<template>
  <div class="container">
    <!-- Search input -->
    <div class="section row">
      <div class="six columns offset-by-three">
        <input class="u-full-width"
          type="text"
          v-model="search.term"
          @change="lookup"
          placeholder="I am interested in...">
      </div>
    </div>

    <!-- Search categories -->
    <div class="row">
      <div class="eight columns offset-by-two">
        <div
          class="four columns"
          v-for="category in search.categories"
          :key="category.name">
          <button
            :class="{ 'button-primary': category.selected,}"
            class="standard-size"
            @click="category.selected = !category.selected">
              <i
                class="lnr"
                :class="{'lnr-cloud': !category.selected, 'lnr-sun': category.selected}"
              ></i>
              {{category.name}}
          </button>
        </div>
      </div>
    </div>

    <!-- Search results -->
    <div class="row">
      <div class="six columns offset-by-three">
        <p>Found: {{resultNumber}} | Among:
          <span v-for='sc in searchCategories' :key="sc.name">{{sc.name}} </span> </p>
      </div>
    </div>

    <!-- TODO: add the result rendering component -->
  </div>
</template>

<script>
export default {
  name: 'Discover',
  data() {
    return {
      search: {
        term: '',
        lastTerm: '',
        categories: [
          {
            name: 'events',
            selected: true,
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
        results: [],
      },
    };
  },
  computed: {
    resultNumber() {
      return this.search.results.length;
    },
    searchCategories() {
      const searchCategories = this.search.categories.filter(
        cat => cat.selected,
      );
      console.log(searchCategories);
      return (searchCategories.length === 0) ? [{ name: 'everything' }] : searchCategories;
    },
  },
  methods: {
    lookup() {
      const newTerm = this.search.term;
      const oldTerm = this.search.lastTerm;
      if (newTerm !== oldTerm) {
        this.search.results = [
          { name: 'Dummy', description: 'I am a dummy search result', newTerm },
        ];
      }
    },
  },
};
</script>

