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
          <span v-for='sc in searchCategories' :key="sc.name">{{capitalize(sc.name)}} </span> </p>
      </div>
    </div>

    <hr>

    <!-- TODO: add the result rendering into a component -->
    <!-- Rendering the results -->
    <section id="results">
      <div class="container section">
        <!-- <div class="row">
          <h5>Results</h5>
        </div> -->
        <div id="nothing" class="row" v-if="search.results.length == 0">
          <p>Huh... seems like nothing is there... for your request </p>
        </div>
        <div v-else v-for="result in search.results"
          :key="result.title">
          <div class="card">
            <div class="row">
              <div class="one column offset-by-three">
                <span class="lnr lnr-leaf"></span>
              </div>
              <div class="five columns u-left-align">
                <h6>
                  <b>{{result.title}}</b>
                  <br/>
                  <i>"{{result.description}}"</i>
                </h6>
              </div>
            </div>
            <div class="row">
              <div class="one column offset-by-three">
                <span class="lnr lnr-users"></span>
              </div>
              <div class="five columns u-left-align">
                <p>
                  <i>{{result.host}}</i>
                  <br/>
                  <i>{{result.location}}</i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Discover',
  data() {
    return {
      DISCOVER_SERVICE: 'https://volunteero-magic-mirror.herokuapp.com/',
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

      return searchCategories.length === 0
        ? [{ name: 'none' }] // todo: that's what magic-mirror expects
        : searchCategories;
    },
  },
  methods: {
    lookup() {
      console.info('fired lookup');
      const searchTerm = this.search.term;
      const searchEntities = this.searchCategories.map(cat => cat.name);
      const discoveryBody = {
        entities: searchEntities,
        search_term: searchTerm,
      };
      const self = this;
      console.log(discoveryBody);
      axios
        .put(`${self.DISCOVER_SERVICE}discover`, discoveryBody)
        .then((response) => {
          console.log(response);
          const results = response.data.results;
          self.search.results = results;
        })
        .catch((error) => {
          console.error('Could not get results fromt the discovery service...');
          console.log(error);
          self.search.results = [];
        });
    },
    capitalize(s) {
      return s[0].toUpperCase() + s.slice(1);
    },
  },
};
</script>

<style>
.card {
  border-bottom: 1px solid #eee;
  margin-top: 5px
}
</style>
