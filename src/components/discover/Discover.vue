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
            @click="select(category)">
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
                <h5><span class="lnr" :class="getIconClass(result)"></span></h5>
              </div>
              <div class="five columns u-left-align">
                <h5>
                  <b>{{result.name}}</b>
                  <br/>
                  <i>"{{result.description}}"</i>
                </h5>
              </div>
            </div>
            <!-- <div class="row">
              <div class="one column offset-by-three">
                <span class="lnr lnr-flag"></span>
              </div>
              <div class="five columns u-left-align">
                <p>
                  <i>{{result.location}}</i>
                </p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

const DATA_TYPES = {
  event: 'event',
  campaign: 'campaign',
  organization: 'organization',
};

export default {
  name: 'Discover',
  data() {
    return {
      DISCOVER_SERVICE: 'https://volunteero-search.herokuapp.com/api/v1/search',
      search: {
        term: '',
        lastTerm: '',
        categories: [
          {
            name: 'events',
            value: DATA_TYPES.event,
            selected: true,
          },
          {
            name: 'campaigns',
            value: DATA_TYPES.campaign,
            selected: false,
          },
          {
            name: 'organizations',
            value: DATA_TYPES.organization,
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
        ? [{ name: 'everything', value: 'any' }] // todo: that's what magic-mirror expects
        : searchCategories;
    },
    searchTerm() {
      return encodeURIComponent(this.search.term.trim());
    },
  },
  methods: {
    select(category) {
      this.search.categories = this.search.categories.map((cat) => {
        const catCopy = Object.assign({}, cat);
        catCopy.selected = cat.name === category.name && !category.selected;
        return catCopy;
      });
      this.lookup();
    },
    lookup() {
      console.info('fired lookup');
      const searchTerm = this.searchTerm;
      if (searchTerm.length === 0) {
        return;
      }
      const searchEntities = this.searchCategories.map(cat => cat.value);
      const discoveryBody = {
        entities: `?type=${searchEntities.shift()}`,
        search_term: `&keyword=${searchTerm}`,
      };
      const self = this;
      console.log(discoveryBody);
      axios
        .get(
          `${self.DISCOVER_SERVICE}${discoveryBody.entities}${
            discoveryBody.search_term
          }`,
        )
        .then((response) => {
          console.log(response);
          const campaigns = (response.data.campaigns || []).map((camp) => {
            const campCopy = Object.assign({}, camp);
            campCopy.type = DATA_TYPES.campaign;
            return campCopy;
          });
          const events = (response.data.events || []).map((event) => {
            const eventCopy = Object.assign({}, event);
            eventCopy.type = DATA_TYPES.event;
            return eventCopy;
          });
          const organizations = (response.data.organizations || []).map(
            (event) => {
              const eventCopy = Object.assign({}, event);
              eventCopy.type = DATA_TYPES.organization;
              return eventCopy;
            },
          );
          const results = campaigns.concat(events).concat(organizations);
          self.search.results = results.sort(() => Math.random() > 0.3);
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
    getIconClass({ type }) {
      switch (type) {
        case DATA_TYPES.event: {
          return 'lnr-leaf';
        }
        case DATA_TYPES.campaign: {
          return 'lnr-flag';
        }
        case DATA_TYPES.organization: {
          return 'lnr-home';
        }
        default: {
          return 'lnr-leaf';
        }
      }
    },
  },
};
</script>

<style>
.card {
  border-bottom: 1px solid #eee;
  margin-top: 5px;
}
</style>
