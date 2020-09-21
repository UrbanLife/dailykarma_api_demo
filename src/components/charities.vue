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
              @keyup.enter="findCharities"
          >
          <span class="icon is-left"><b-icon icon="search" size="is-small"></b-icon></span>
        </p>
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
                  @click="addCharities($event)">Install</div>
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
          if (this.loadingComponent) {
            this.loadingComponent.close();
          }
        }
        if (mutation.type === 'charities/CHARITY_INSTALLED') {
          this.$router.push({ name: 'dashboard' });
        }
      });
    },
    ...mapActions({
      searchCharities: 'charities/searchCharities',
      eraseSearchResult: 'charities/eraseSearchResult',
      addCharity: 'charities/addCharity',
    }),
    findCharities() {
      this.loadingComponent = this.$buefy.loading.open({
        container: null
      });
      this.searchCharities({
        'charity': this.search_charity,
        'category': ''
      });
    },
    addCharities(e) {
      let currItem = e.target;
      let currItemId = currItem.attributes["data-id"].value;
      this.charities.charities.push({'id': currItemId});
      this.addCharity(this.charities);
    }
  },
}
</script>