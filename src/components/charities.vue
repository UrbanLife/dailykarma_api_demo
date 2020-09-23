<template>
  <div id="container">
    <div class="browse-charities">
      <div class="search-box">
        <p class="control has-icons-left">
          <input
              class="input"
              type="text"
              placeholder="Search charities"
              v-model="search_charity"
              @keyup="findCharities"
          >
          <span class="icon is-left"><b-icon icon="search" size="is-small"></b-icon></span>
        </p>
      </div>
      <div class="selected_categories">
        <div class="category" v-for="category in search_categories">
          <span class="category">{{ category }}</span>
          <span class="remove" @click="removeSearchCategory(category)">x</span>
        </div>
      </div>
      <div class="categories">
        <div class="category" v-for="category in categories">
          <span :data-category="category" @click="addCategory($event)">{{ category }}</span>
        </div>
      </div>
      <div v-if="foundCharities" class="columns found-charities">
        <div class="row is-multiline">
          <div class="card" v-for="charity in foundCharities">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-96x96">
                    <img :src="charity.thumbnailUrl||'https://bulma.io/images/placeholders/96x96.png'"
                         :alt="charity.name">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ charity.name }}</p>
                  <p class="subtitle is-6">{{ charity.category }}</p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <div
                  :data-id="charity.id"
                  class="install-charity"
                  @click="addCharities($event)">Install
              </div>
            </footer>
          </div>
        </div>
      </div>
      <div v-else></div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      title: 'Daily Karma ShowCase',
      loadingComponent: null,
      search_charity: '',
      charities: {"charities": []},
      search_categories: [],
      categories: [
        'arts-music-humanities-culture', 'community-improvement-and-service',
        'education-and-research', 'other', 'human-services', 'international',
        'religion', 'human-and-civil-rights', 'animals', 'children-and-youth',
        'disaster-relief', 'environment', 'homelessness-and-housing', 'immigrants-and-refugees',
        'lgbtqi-plus', 'health-medical-disease-and-disorders', 'womens-rights-and-empowerment',
        'veterans-and-military-families'
      ],
    }
  },
  created() {
    this.unSubscribeEvents = this.initEventHandlers();
  },
  destroyed() {
  },
  mounted() {
    this.eraseSearchResult();
  },
  beforeDestroy() {
    this.unSubscribeEvents();
  },
  computed: {
    ...mapGetters({
      foundCharities: 'charities/getFoundCharities',
    }),
  },
  methods: {
    initEventHandlers() {
      return this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'charities/FOUND_CHARITIES') {
        }
        if (mutation.type === 'charities/CHARITY_ADDED') {
          this.$router.push({name: 'dashboard'});
        }
      });
    },
    ...mapActions({
      searchCharities: 'charities/searchCharities',
      eraseSearchResult: 'charities/eraseSearchResult',
      addCharity: 'charities/addCharity',
    }),
    showLoader(status) {
      if (status) {
        this.loadingComponent = this.$buefy.loading.open({
          container: null
        });
      } else {
        if (this.loadingComponent) {
          this.loadingComponent.close();
        }
      }
    },
    findCharities() {
      let categories = '';
      this.search_categories.map((el) => categories += `,${el}`);

      this.searchCharities({
        'charity': this.search_charity,
        'categories': categories.substring(1)
      });
    },
    addCharities(e) {
      const currItem = e.target;
      const currItemId = currItem.attributes["data-id"].value;
      this.charities.charities.push({'id': currItemId});
      this.addCharity(this.charities);
    },
    addCategory(e) {
      const currItem = e.target;
      let category = currItem.attributes["data-category"].value;

      if (category.trim().length && !this.search_categories.includes(category)) {
        this.search_categories.push(category);
      }
      this.findCharities();
    },
    removeSearchCategory(category) {
      const category_idx = this.search_categories.indexOf(category);
      this.search_categories.splice(category_idx, 1);
      this.findCharities();
    }
  },
}
</script>